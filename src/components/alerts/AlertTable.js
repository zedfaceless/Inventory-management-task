import { useState } from 'react';
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
  IconButton,
  Tooltip,
  Box,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formatCurrency, formatNumber } from '../../utils/calculations';

const AlertTable = ({ alerts, onAcknowledge, onUnacknowledge }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAcknowledged, setFilterAcknowledged] = useState('all');

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.productSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    
    const matchesAcknowledged = 
      filterAcknowledged === 'all' ||
      (filterAcknowledged === 'acknowledged' && alert.acknowledged) ||
      (filterAcknowledged === 'unacknowledged' && !alert.acknowledged);

    return matchesSearch && matchesStatus && matchesAcknowledged;
  });

  const getStatusColor = (status) => {
    const colors = {
      critical: 'error',
      low: 'warning',
      warning: 'warning',
      adequate: 'success',
      overstocked: 'info',
    };
    return colors[status] || 'default';
  };

  const getPriorityIcon = (priority) => {
    if (priority <= 2) return '🔴';
    if (priority === 3) return '🟡';
    return '🟢';
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Alert Management
          </Typography>
        </Box>

        {/* Filters */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField
            placeholder="Search products..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="low">Low Stock</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Acknowledged"
            value={filterAcknowledged}
            onChange={(e) => setFilterAcknowledged(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="unacknowledged">Unacknowledged</MenuItem>
            <MenuItem value="acknowledged">Acknowledged</MenuItem>
          </TextField>

          {(searchTerm || filterStatus !== 'all' || filterAcknowledged !== 'all') && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterAcknowledged('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </Box>

        {/* Results count */}
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={50}></TableCell>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell align="right"><strong>Current Stock</strong></TableCell>
                <TableCell align="right"><strong>Reorder Point</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Recommended Order</strong></TableCell>
                <TableCell align="right"><strong>Est. Cost</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      {searchTerm || filterStatus !== 'all' || filterAcknowledged !== 'all'
                        ? 'No alerts match your filters'
                        : '🎉 No alerts! All inventory levels are adequate.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow
                    key={alert.id}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      opacity: alert.acknowledged ? 0.7 : 1,
                      backgroundColor: alert.acknowledged ? 'action.hover' : 'inherit',
                    }}
                  >
                    <TableCell>
                      <Tooltip title={alert.message}>
                        <span style={{ fontSize: '1.2rem' }}>
                          {getPriorityIcon(alert.priority)}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {alert.productName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {alert.productSku}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{alert.category}</TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={alert.currentStock === 0 ? 'error.main' : 'text.primary'}
                      >
                        {formatNumber(alert.currentStock)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{formatNumber(alert.reorderPoint)}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={alert.level}
                        color={getStatusColor(alert.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                        <ShoppingCartIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" fontWeight={600}>
                          {formatNumber(alert.recommendedOrderQuantity)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(alert.estimatedCost)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {alert.acknowledged ? (
                        <Tooltip title="Unacknowledge">
                          <IconButton
                            size="small"
                            onClick={() => onUnacknowledge(alert.id)}
                            color="default"
                          >
                            <UndoIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Acknowledge alert">
                          <IconButton
                            size="small"
                            onClick={() => onAcknowledge(alert.id)}
                            color="success"
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AlertTable;