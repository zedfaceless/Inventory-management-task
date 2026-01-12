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
  Box,
} from '@mui/material';
import { format } from 'date-fns';

const TransferHistory = ({ transfers, products, warehouses }) => {
  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? `${product.sku} - ${product.name}` : 'Unknown';
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse ? `${warehouse.code} - ${warehouse.name}` : 'Unknown';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      'in-transit': 'warning',
      pending: 'default',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  // Sort transfers by date (newest first)
  const sortedTransfers = [...transfers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600} mb={3}>
          Transfer History
        </Typography>

        {transfers.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography color="text.secondary">
              No transfers yet. Create your first transfer above.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Transfer ID</strong></TableCell>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>From</strong></TableCell>
                  <TableCell><strong>To</strong></TableCell>
                  <TableCell align="right"><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTransfers.map((transfer) => (
                  <TableRow
                    key={transfer.id}
                    sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <TableCell>{transfer.id}</TableCell>
                    <TableCell>{getProductName(transfer.productId)}</TableCell>
                    <TableCell>{getWarehouseName(transfer.fromWarehouseId)}</TableCell>
                    <TableCell>{getWarehouseName(transfer.toWarehouseId)}</TableCell>
                    <TableCell align="right">{transfer.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      {format(new Date(transfer.createdAt), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={transfer.status}
                        color={getStatusColor(transfer.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TransferHistory;