import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TransferForm = ({ products, warehouses, onTransferComplete }) => {
  const [formData, setFormData] = useState({
    productId: '',
    fromWarehouseId: '',
    toWarehouseId: '',
    quantity: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-hide success message after 6 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setShowSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setShowSuccess(false);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/transfers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: parseInt(formData.productId),
          fromWarehouseId: parseInt(formData.fromWarehouseId),
          toWarehouseId: parseInt(formData.toWarehouseId),
          quantity: parseInt(formData.quantity),
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create transfer');
      }

      // Get product and warehouse names for display
      const product = products.find(p => p.id === parseInt(formData.productId));
      const fromWarehouse = warehouses.find(w => w.id === parseInt(formData.fromWarehouseId));
      const toWarehouse = warehouses.find(w => w.id === parseInt(formData.toWarehouseId));

      // Set success message with details
      setSuccessMessage(
        `Successfully transferred ${formData.quantity} units of ${product?.name} from ${fromWarehouse?.name} to ${toWarehouse?.name}`
      );
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        productId: '',
        fromWarehouseId: '',
        toWarehouseId: '',
        quantity: '',
        notes: '',
      });

      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // DELAY the data refresh so success message is visible
      setTimeout(() => {
        if (onTransferComplete) {
          onTransferComplete();
        }
      }, 2000); // Wait 2 seconds before refreshing data

    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600} mb={3}>
          Create Stock Transfer
        </Typography>

        {error && (
          <Box
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight={600}>
                ✕ Error
              </Typography>
            </Box>
            <Typography variant="body1">
              {error}
            </Typography>
          </Box>
        )}

        {showSuccess && (
          <Box
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: 2,
              boxShadow: 3,
              animation: 'slideDown 0.3s ease-out',
              '@keyframes slideDown': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <CheckCircleOutlineIcon sx={{ fontSize: 32, mr: 2 }} />
              <Typography variant="h6" fontWeight={600}>
                ✓ Transfer Completed Successfully!
              </Typography>
            </Box>
            <Typography variant="body1">
              {successMessage}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Product"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Select a product</em>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.sku} - {product.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="From Warehouse"
                name="fromWarehouseId"
                value={formData.fromWarehouseId}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Select source warehouse</em>
                </MenuItem>
                {warehouses.map((warehouse) => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.code} - {warehouse.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="To Warehouse"
                name="toWarehouseId"
                value={formData.toWarehouseId}
                onChange={handleChange}
                required
                disabled={!formData.fromWarehouseId}
              >
                <MenuItem value="">
                  <em>Select destination warehouse</em>
                </MenuItem>
                {warehouses
                  .filter((w) => w.id !== parseInt(formData.fromWarehouseId))
                  .map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.code} - {warehouse.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes (Optional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Add any notes about this transfer..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  disabled={loading}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Processing...' : 'Create Transfer'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransferForm;