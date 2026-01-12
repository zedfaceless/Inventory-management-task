import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

// Import custom components
import { theme } from '../styles/theme';
import Layout from '../components/common/Layout';
import { useDashboardData } from '../hooks/useDashboardData';
import MetricCard from '../components/common/MetricCard';
import WarehouseStockChart from '../components/dashboard/WarehouseStockChart';
import CategoryDistributionChart from '../components/dashboard/CategoryDistributionChart';
import InventoryTable from '../components/dashboard/InventoryTable';

// Import utility functions
import {
  calculateTotalInventoryValue,
  calculateTotalStock,
  getLowStockItems,
  getStockByWarehouse,
  getCategoryDistribution,
  formatCurrency,
  formatNumber,
} from '../utils/calculations';

export default function Home() {
  const { data, loading, error } = useDashboardData();
  const { products, warehouses, stockLevels } = data;

  // Calculate metrics
  const totalInventoryValue = calculateTotalInventoryValue(products, stockLevels);
  const totalStock = calculateTotalStock(stockLevels);
  const lowStockItems = getLowStockItems(products, stockLevels);
  const warehouseStockData = getStockByWarehouse(warehouses, stockLevels);
  const categoryData = getCategoryDistribution(products, stockLevels);
  const avgStockPerWarehouse = warehouses.length > 0 
    ? Math.round(totalStock / warehouses.length) 
    : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Page Header */}
          <Box mb={4}>
            <Typography variant="h4" component="h1" fontWeight={700} color="primary.dark" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to GreenSupply Co Inventory Management System
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
              Error loading dashboard data: {error}
            </Alert>
          )}

          {/* Dashboard Content */}
          {!loading && !error && (
            <>
              {/* Key Metrics Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <MetricCard
                    title="Total Products"
                    value={products.length}
                    icon={CategoryIcon}
                    color="primary"
                    subtitle={`${products.length} unique SKUs`}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <MetricCard
                    title="Active Warehouses"
                    value={warehouses.length}
                    icon={WarehouseIcon}
                    color="secondary"
                    subtitle={`Avg ${formatNumber(avgStockPerWarehouse)} units/warehouse`}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <MetricCard
                    title="Total Inventory Value"
                    value={formatCurrency(totalInventoryValue)}
                    icon={AttachMoneyIcon}
                    color="success"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <MetricCard
                    title="Total Stock Units"
                    value={formatNumber(totalStock)}
                    icon={TrendingUpIcon}
                    color="primary"
                    subtitle="Across all locations"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <MetricCard
                    title="Low Stock Alerts"
                    value={lowStockItems.length}
                    icon={WarningIcon}
                    color={lowStockItems.length > 0 ? "warning" : "success"}
                    subtitle={lowStockItems.length > 0 ? "Needs attention" : "All products stocked"}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <MetricCard
                    title="Product Categories"
                    value={categoryData.length}
                    icon={InventoryIcon}
                    color="secondary"
                    subtitle="Different categories"
                  />
                </Grid>
              </Grid>

              {/* Charts Section */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <WarehouseStockChart data={warehouseStockData} />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <CategoryDistributionChart data={categoryData} />
                </Grid>
              </Grid>

              {/* Inventory Overview Table */}
              <InventoryTable products={products} stockLevels={stockLevels} />
            </>
          )}
        </Container>
      </Layout>
    </ThemeProvider>
  );
}