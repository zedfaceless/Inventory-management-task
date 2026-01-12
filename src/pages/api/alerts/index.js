import fs from 'fs';
import path from 'path';
import { generateAlerts } from '../../../utils/alertCalculations';

const alertsFilePath = path.join(process.cwd(), 'data', 'alerts.json');
const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
const stockFilePath = path.join(process.cwd(), 'data', 'stock.json');

// Ensure the file exists
const ensureAlertsFile = () => {
  if (!fs.existsSync(alertsFilePath)) {
    fs.writeFileSync(alertsFilePath, JSON.stringify([], null, 2));
  }
};

export default function handler(req, res) {
  ensureAlertsFile();

  if (req.method === 'GET') {
    // Get all alerts (regenerate based on current stock levels)
    try {
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      const stockLevels = JSON.parse(fs.readFileSync(stockFilePath, 'utf8'));
      const existingAlerts = JSON.parse(fs.readFileSync(alertsFilePath, 'utf8'));

      // Generate fresh alerts based on current data
      const alerts = generateAlerts(products, stockLevels, existingAlerts);

      // Save updated alerts
      fs.writeFileSync(alertsFilePath, JSON.stringify(alerts, null, 2));

      res.status(200).json(alerts);
    } catch (error) {
      console.error('Error generating alerts:', error);
      res.status(500).json({ error: 'Failed to generate alerts' });
    }
  } else if (req.method === 'PATCH') {
    // Update an alert (acknowledge, resolve, etc.)
    try {
      const { alertId, action } = req.body;

      if (!alertId || !action) {
        return res.status(400).json({ error: 'Missing alertId or action' });
      }

      const alerts = JSON.parse(fs.readFileSync(alertsFilePath, 'utf8'));
      const alertIndex = alerts.findIndex(a => a.id === alertId);

      if (alertIndex === -1) {
        return res.status(404).json({ error: 'Alert not found' });
      }

      // Update alert based on action
      if (action === 'acknowledge') {
        alerts[alertIndex].acknowledged = true;
        alerts[alertIndex].acknowledgedAt = new Date().toISOString();
      } else if (action === 'resolve') {
        alerts[alertIndex].resolvedAt = new Date().toISOString();
      } else if (action === 'unacknowledge') {
        alerts[alertIndex].acknowledged = false;
        alerts[alertIndex].acknowledgedAt = null;
      }

      alerts[alertIndex].updatedAt = new Date().toISOString();

      // Save updated alerts
      fs.writeFileSync(alertsFilePath, JSON.stringify(alerts, null, 2));

      res.status(200).json(alerts[alertIndex]);
    } catch (error) {
      console.error('Error updating alert:', error);
      res.status(500).json({ error: 'Failed to update alert' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}