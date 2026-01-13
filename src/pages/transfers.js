import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';

import Layout from '../components/common/Layout';
import TransferForm from '../components/transfers/TransferForm';
import TransferHistory from '../components/transfers/TransferHistory';

export default function TransfersPage() {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, warehousesRes, transfersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/warehouses'),
        fetch('/api/transfers'),
      ]);

      if (!productsRes.ok || !warehousesRes.ok || !transfersRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const productsData = await productsRes.json();
      const warehousesData = await warehousesRes.json();
      const transfersData = await transfersRes.json();

      setProducts(productsData);
      setWarehouses(warehousesData);
      setTransfers(transfersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransferComplete = () => {
    // Refresh data after a successful transfer
    fetchData();
  };

  return (
      <Layout>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Page Header */}
          <Box mb={4}>
            <Typography variant="h4" component="h1" fontWeight={700} color="primary.dark" gutterBottom>
              Stock Transfers
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Transfer inventory between warehouse locations
            </Typography>
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
              Error loading data: {error}
            </Alert>
          )}

          {/* Content */}
          {!loading && !error && (
            <Grid container spacing={4}>
              {/* Transfer Form */}
              <Grid item xs={12}>
                <TransferForm
                  products={products}
                  warehouses={warehouses}
                  onTransferComplete={handleTransferComplete}
                />
              </Grid>

              {/* Transfer History */}
              <Grid item xs={12}>
                <TransferHistory
                  transfers={transfers}
                  products={products}
                  warehouses={warehouses}
                />
              </Grid>
            </Grid>
          )}
        </Container>
      </Layout>
  );
}
