/**
 * Alert utility functions for inventory management
 */

/**
 * Calculate stock status for a product
 * @param {number} totalStock - Total stock across all warehouses
 * @param {number} reorderPoint - Reorder point threshold
 * @returns {Object} Status information
 */
export const calculateStockStatus = (totalStock, reorderPoint) => {
  const percentage = (totalStock / reorderPoint) * 100;

  if (totalStock === 0) {
    return {
      status: 'critical',
      level: 'Out of Stock',
      color: 'error',
      priority: 1,
      message: 'Immediate action required - product is out of stock',
    };
  } else if (percentage < 25) {
    return {
      status: 'critical',
      level: 'Critical',
      color: 'error',
      priority: 2,
      message: 'Stock is critically low - reorder immediately',
    };
  } else if (percentage < 50) {
    return {
      status: 'low',
      level: 'Low Stock',
      color: 'warning',
      priority: 3,
      message: 'Stock is below 50% of reorder point - plan to reorder soon',
    };
  } else if (totalStock < reorderPoint) {
    return {
      status: 'warning',
      level: 'Approaching Low',
      color: 'warning',
      priority: 4,
      message: 'Stock approaching reorder point - monitor closely',
    };
  } else if (totalStock >= reorderPoint && totalStock < reorderPoint * 2) {
    return {
      status: 'adequate',
      level: 'Adequate',
      color: 'success',
      priority: 5,
      message: 'Stock levels are adequate',
    };
  } else {
    return {
      status: 'overstocked',
      level: 'Overstocked',
      color: 'info',
      priority: 6,
      message: 'Stock levels are high - consider adjusting orders',
    };
  }
};

/**
 * Calculate recommended reorder quantity
 * @param {number} totalStock - Current total stock
 * @param {number} reorderPoint - Reorder point threshold
 * @param {number} avgMonthlyUsage - Average monthly usage (optional)
 * @returns {number} Recommended quantity to order
 */
export const calculateReorderQuantity = (totalStock, reorderPoint, avgMonthlyUsage = null) => {
  // If we have usage data, calculate based on that
  if (avgMonthlyUsage) {
    // Order enough for 2 months minus current stock
    const targetStock = avgMonthlyUsage * 2;
    return Math.max(0, targetStock - totalStock);
  }
  
  // Otherwise, order to reach 2x reorder point
  const targetStock = reorderPoint * 2;
  const orderQuantity = targetStock - totalStock;
  
  return Math.max(0, Math.ceil(orderQuantity));
};

/**
 * Generate alerts for products that need attention
 * @param {Array} products - Array of products
 * @param {Array} stockLevels - Array of stock levels
 * @param {Array} existingAlerts - Existing alerts to preserve user actions
 * @returns {Array} Array of alert objects
 */
export const generateAlerts = (products, stockLevels, existingAlerts = []) => {
  const alerts = [];

  products.forEach(product => {
    // Calculate total stock for this product
    const productStock = stockLevels
      .filter(s => s.productId === product.id)
      .reduce((sum, s) => sum + s.quantity, 0);

    const stockStatus = calculateStockStatus(productStock, product.reorderPoint);

    // Only create alerts for products that need attention (not adequate or overstocked)
    if (['critical', 'low', 'warning'].includes(stockStatus.status)) {
      const reorderQuantity = calculateReorderQuantity(productStock, product.reorderPoint);

      // Check if alert already exists
      const existingAlert = existingAlerts.find(a => a.productId === product.id);

      const alert = {
        id: existingAlert?.id || `ALERT-${Date.now()}-${product.id}`,
        productId: product.id,
        productSku: product.sku,
        productName: product.name,
        category: product.category,
        currentStock: productStock,
        reorderPoint: product.reorderPoint,
        status: stockStatus.status,
        level: stockStatus.level,
        priority: stockStatus.priority,
        message: stockStatus.message,
        recommendedOrderQuantity: reorderQuantity,
        estimatedCost: reorderQuantity * product.unitCost,
        acknowledged: existingAlert?.acknowledged || false,
        acknowledgedAt: existingAlert?.acknowledgedAt || null,
        resolvedAt: existingAlert?.resolvedAt || null,
        createdAt: existingAlert?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      alerts.push(alert);
    }
  });

  // Sort by priority (most critical first)
  return alerts.sort((a, b) => a.priority - b.priority);
};

/**
 * Get alert statistics
 * @param {Array} alerts - Array of alerts
 * @returns {Object} Statistics object
 */
export const getAlertStatistics = (alerts) => {
  return {
    total: alerts.length,
    critical: alerts.filter(a => a.status === 'critical').length,
    low: alerts.filter(a => a.status === 'low').length,
    warning: alerts.filter(a => a.status === 'warning').length,
    acknowledged: alerts.filter(a => a.acknowledged).length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
    totalReorderCost: alerts.reduce((sum, a) => sum + a.estimatedCost, 0),
  };
};