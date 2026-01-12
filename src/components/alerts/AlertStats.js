import { Grid } from '@mui/material';
import MetricCard from '../common/MetricCard';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatCurrency } from '../../utils/calculations';

const AlertStats = ({ statistics }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Total Alerts"
          value={statistics.total}
          icon={InfoIcon}
          color="primary"
          subtitle={`${statistics.unacknowledged} need attention`}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Critical Alerts"
          value={statistics.critical}
          icon={ErrorIcon}
          color="error"
          subtitle="Immediate action required"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Low Stock Items"
          value={statistics.low}
          icon={WarningIcon}
          color="warning"
          subtitle="Reorder soon"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Warnings"
          value={statistics.warning}
          icon={WarningIcon}
          color="warning"
          subtitle="Monitor closely"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Acknowledged"
          value={statistics.acknowledged}
          icon={CheckCircleIcon}
          color="success"
          subtitle={`${statistics.unacknowledged} unacknowledged`}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Est. Reorder Cost"
          value={formatCurrency(statistics.totalReorderCost)}
          icon={AttachMoneyIcon}
          color="info"
          subtitle="Total to restock"
        />
      </Grid>
    </Grid>
  );
};

export default AlertStats;