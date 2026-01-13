import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import Layout from '../components/common/Layout';
import AlertStats from '../components/alerts/AlertStats';
import AlertTable from '../components/alerts/AlertTable';
import { getAlertStatistics } from '../utils/alertCalculations';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/alerts');

      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }

      const data = await response.json();
      setAlerts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAlerts();
  };

  const handleAcknowledge = async (alertId) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alertId,
          action: 'acknowledge',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to acknowledge alert');
      }

      // Update local state
      setAlerts(alerts.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: true, acknowledgedAt: new Date().toISOString() }
          : alert
      ));
    } catch (err) {
      console.error('Error acknowledging alert:', err);
      alert('Failed to acknowledge alert: ' + err.message);
    }
  };

  const handleUnacknowledge = async (alertId) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alertId,
          action: 'unacknowledge',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to unacknowledge alert');
      }

      // Update local state
      setAlerts(alerts.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: false, acknowledgedAt: null }
          : alert
      ));
    } catch (err) {
      console.error('Error unacknowledging alert:', err);
      alert('Failed to unacknowledge alert: ' + err.message);
    }
  };

  const statistics = getAlertStatistics(alerts);

  return (
      <Layout>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Page Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} color="primary.dark" gutterBottom>
                Low Stock Alerts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Monitor and manage inventory alerts
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshIcon />}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              Refresh Alerts
            </Button>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress size={60} />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Error loading alerts: {error}
            </Alert>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Statistics Cards */}
              <Box mb={4}>
                <AlertStats statistics={statistics} />
              </Box>

              {/* Alert Table */}
              <AlertTable
                alerts={alerts}
                onAcknowledge={handleAcknowledge}
                onUnacknowledge={handleUnacknowledge}
              />
            </>
          )}
        </Container>
      </Layout>
  );
}
