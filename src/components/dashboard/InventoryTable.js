import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  TextField,
  Box,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';

/**
 * Enhanced inventory overview table with search functionality
 */
const InventoryTable = ({ products, stockLevels }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Aggregate stock by product
  const getProductStock = (productId) => {
    return stockLevels
      .filter(stock => stock.productId === productId)
      .reduce((total, stock) => total + stock.quantity, 0);
  };

  // Determine stock status
  const getStockStatus = (totalStock, reorderPoint) => {
    if (totalStock === 0) {
      return { label: 'Out of Stock', color: 'error' };
    } else if (totalStock < reorderPoint * 0.5) {
      return { label: 'Critical', color: 'error' };
    } else if (totalStock < reorderPoint) {
      return { label: 'Low Stock', color: 'warning' };
    } else {
      return { label: 'In Stock', color: 'success' };
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Inventory Overview
          </Typography>
          <TextField
            placeholder="Search products..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>SKU</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell align="right"><strong>Total Stock</strong></TableCell>
                <TableCell align="right"><strong>Reorder Point</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => {
                const totalStock = getProductStock(product.id);
                const status = getStockStatus(totalStock, product.reorderPoint);
                
                return (
                  <TableRow 
                    key={product.id}
                    sx={{ 
                      '&:hover': { backgroundColor: 'action.hover' },
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">{totalStock.toLocaleString()}</TableCell>
                    <TableCell align="right">{product.reorderPoint.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={status.label} 
                        color={status.color} 
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredProducts.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography color="text.secondary">
              No products found matching "{searchTerm}"
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryTable;