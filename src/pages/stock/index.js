import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { theme } from '../../styles/theme';
import Layout from '../../components/common/Layout';
import { formatNumber } from '../../utils/calculations';

export default function StockPage() {
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    warehouseId: '',
    quantity: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stockRes, productsRes, warehousesRes] = await Promise.all([
        fetch('/api/stock'),
        fetch('/api/products'),
        fetch('/api/warehouses'),
      ]);

      if (!stockRes.ok || !productsRes.ok || !warehousesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const stockData = await stockRes.json();
      const productsData = await productsRes.json();
      const warehousesData = await warehousesRes.json();

      setStock(stockData);
      setProducts(productsData);
      setWarehouses(warehousesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? `${product.sku} - ${product.name}` : 'Unknown';
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse ? `${warehouse.code} - ${warehouse.name}` : 'Unknown';
  };

  const handleOpenDialog = (stockItem = null) => {
    if (stockItem) {
      setEditingStock(stockItem);
      setFormData({
        productId: stockItem.productId,
        warehouseId: stockItem.warehouseId,
        quantity: stockItem.quantity,
      });
    } else {
      setEditingStock(null);
      setFormData({
        productId: '',
        warehouseId: '',
        quantity: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStock(null);
    setFormData({
      productId: '',
      warehouseId: '',
      quantity: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const url = editingStock ? `/api/stock/${editingStock.id}` : '/api/stock';
      const method = editingStock ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId: parseInt(formData.productId),
          warehouseId: parseInt(formData.warehouseId),
          quantity: parseInt(formData.quantity),
        }),
      });

      if (!response.ok) throw new Error('Failed to save stock record');

      setSuccessMessage(
        editingStock ? 'Stock updated successfully!' : 'Stock record created successfully!'
      );
      setTimeout(() => setSuccessMessage(''), 3000);

      fetchData();
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this stock record?')) return;

    try {
      const response = await fetch(`/api/stock/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete stock record');

      setSuccessMessage('Stock record deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredStock = stock.filter((item) => {
    const productName = getProductName(item.productId).toLowerCase();
    const warehouseName = getWarehouseName(item.warehouseId).toLowerCase();
    const search = searchTerm.toLowerCase();
    return productName.includes(search) || warehouseName.includes(search);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Page Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} color="primary.dark" gutterBottom>
                Stock Levels
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage inventory across all warehouses
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              size="large"
            >
              Add Stock Record
            </Button>
          </Box>

          {/* Success Message */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Card>
              <CardContent>
                {/* Search Bar */}
                <Box mb={3}>
                  <TextField
                    placeholder="Search by product or warehouse..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ minWidth: 300 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Showing {filteredStock.length} of {stock.length} records
                  </Typography>
                </Box>

                {/* Stock Table */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Warehouse</strong></TableCell>
                        <TableCell align="right"><strong>Quantity</strong></TableCell>
                        <TableCell align="center"><strong>Actions</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStock.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">
                              {searchTerm
                                ? 'No stock records match your search'
                                : 'No stock records yet. Add your first record!'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStock.map((item) => (
                          <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                            <TableCell>
                              <Chip label={getProductName(item.productId)} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell>
                              <Chip label={getWarehouseName(item.warehouseId)} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell align="right">{formatNumber(item.quantity)}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenDialog(item)}
                                color="primary"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(item.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Add/Edit Stock Dialog */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                  <DialogTitle>{editingStock ? 'Edit Stock' : 'Add Stock Record'}</DialogTitle>
                  <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                      <TextField
                        select
                        label="Product"
                        value={formData.productId}
                        onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                        required
                        fullWidth
                      >
                        {products.map((p) => (
                          <MenuItem key={p.id} value={p.id}>
                            {`${p.sku} - ${p.name}`}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        select
                        label="Warehouse"
                        value={formData.warehouseId}
                        onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                        required
                        fullWidth
                      >
                        {warehouses.map((w) => (
                          <MenuItem key={w.id} value={w.id}>
                            {`${w.code} - ${w.name}`}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        label="Quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                        fullWidth
                        inputProps={{ min: 0 }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                      {editingStock ? 'Update' : 'Create'}
                    </Button>
                  </DialogActions>
                </Dialog>

              </CardContent>
            </Card>
          )}
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
