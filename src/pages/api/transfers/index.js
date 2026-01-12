import fs from 'fs';
import path from 'path';

const transfersFilePath = path.join(process.cwd(), 'data', 'transfers.json');

// Ensure the file exists
const ensureTransfersFile = () => {
  if (!fs.existsSync(transfersFilePath)) {
    fs.writeFileSync(transfersFilePath, JSON.stringify([], null, 2));
  }
};

export default function handler(req, res) {
  ensureTransfersFile();

  if (req.method === 'GET') {
    // Get all transfers
    const transfers = JSON.parse(fs.readFileSync(transfersFilePath, 'utf8'));
    res.status(200).json(transfers);
  } else if (req.method === 'POST') {
    // Create a new transfer
    const transfers = JSON.parse(fs.readFileSync(transfersFilePath, 'utf8'));
    const stockData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'stock.json'), 'utf8')
    );
    const productsData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'products.json'), 'utf8')
    );

    const {
      productId,
      fromWarehouseId,
      toWarehouseId,
      quantity,
      notes = '',
    } = req.body;

    // Convert IDs to numbers for comparison
    const prodId = parseInt(productId);
    const fromWhId = parseInt(fromWarehouseId);
    const toWhId = parseInt(toWarehouseId);
    const qty = parseInt(quantity);

    // Validation
    if (!prodId || !fromWhId || !toWhId || !qty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (qty <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    if (fromWhId === toWhId) {
      return res.status(400).json({
        error: 'Source and destination warehouses must be different',
      });
    }

    // Check if product exists
    const product = productsData.find((p) => p.id === prodId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if source warehouse has enough stock
    const sourceStock = stockData.find(
      (s) => s.productId === prodId && s.warehouseId === fromWhId
    );

    if (!sourceStock) {
      return res.status(404).json({
        error: 'Product not found in source warehouse',
      });
    }

    if (sourceStock.quantity < qty) {
      return res.status(400).json({
        error: `Insufficient stock. Available: ${sourceStock.quantity}, Requested: ${qty}`,
      });
    }

    // Create the transfer
    const newTransfer = {
      id: `TRF-${Date.now()}`,
      productId: prodId,
      fromWarehouseId: fromWhId,
      toWarehouseId: toWhId,
      quantity: qty,
      status: 'completed',
      notes,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    // Update stock levels
    // Decrease from source warehouse
    sourceStock.quantity -= qty;

    // Increase in destination warehouse (or create if doesn't exist)
    const destStock = stockData.find(
      (s) => s.productId === prodId && s.warehouseId === toWhId
    );

    if (destStock) {
      destStock.quantity += qty;
    } else {
      // Create new stock record for destination warehouse
      const maxId = Math.max(...stockData.map(s => s.id), 0);
      stockData.push({
        id: maxId + 1,
        productId: prodId,
        warehouseId: toWhId,
        quantity: qty,
      });
    }

    // Save everything
    transfers.push(newTransfer);
    fs.writeFileSync(transfersFilePath, JSON.stringify(transfers, null, 2));
    fs.writeFileSync(
      path.join(process.cwd(), 'data', 'stock.json'),
      JSON.stringify(stockData, null, 2)
    );

    res.status(201).json(newTransfer);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}