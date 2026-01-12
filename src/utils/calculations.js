/**
 * Calculate total inventory value across all products and warehouses
 */
export const calculateTotalInventoryValue = (products, stockLevels) => {
  return stockLevels.reduce((total, stock) => {
    const product = products.find(p => p.id === stock.productId);
    if (product) {
      return total + (product.unitCost * stock.quantity);
    }
    return total;
  }, 0);
};

/**
 * Calculate total stock across all warehouses
 */
export const calculateTotalStock = (stockLevels) => {
  return stockLevels.reduce((total, stock) => total + stock.quantity, 0);
};

/**
 * Get low stock items (stock below reorder point)
 */
export const getLowStockItems = (products, stockLevels) => {
  const productStockMap = {};
  
  // Aggregate stock across warehouses
  stockLevels.forEach(stock => {
    if (!productStockMap[stock.productId]) {
      productStockMap[stock.productId] = 0;
    }
    productStockMap[stock.productId] += stock.quantity;
  });
  
  // Filter products below reorder point
  return products.filter(product => {
    const totalStock = productStockMap[product.id] || 0;
    return totalStock < product.reorderPoint;
  });
};

/**
 * Get stock distribution by warehouse
 */
export const getStockByWarehouse = (warehouses, stockLevels) => {
  const warehouseStockMap = {};
  
  // Initialize all warehouses
  warehouses.forEach(warehouse => {
    warehouseStockMap[warehouse.id] = {
      name: warehouse.name,
      code: warehouse.code,
      totalStock: 0,
    };
  });
  
  // Aggregate stock
  stockLevels.forEach(stock => {
    if (warehouseStockMap[stock.warehouseId]) {
      warehouseStockMap[stock.warehouseId].totalStock += stock.quantity;
    }
  });
  
  return Object.values(warehouseStockMap);
};

/**
 * Get product category distribution
 */
export const getCategoryDistribution = (products, stockLevels) => {
  const categoryMap = {};
  
  stockLevels.forEach(stock => {
    const product = products.find(p => p.id === stock.productId);
    if (product) {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = 0;
      }
      categoryMap[product.category] += stock.quantity;
    }
  });
  
  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};