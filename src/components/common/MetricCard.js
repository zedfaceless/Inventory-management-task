import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

/**
 * Reusable metric card component for displaying KPIs
 */
const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  trend,
  subtitle 
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {/* Icon and Title Row */}
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              backgroundColor: `${color}.light`,
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Icon sx={{ color: `${color}.main`, fontSize: 28 }} />
          </Box>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
        </Box>

        {/* Main Value */}
        <Typography variant="h4" fontWeight={600} color="text.primary" mb={1}>
          {value}
        </Typography>

        {/* Trend and Subtitle */}
        {(trend !== undefined || subtitle) && (
          <Box display="flex" alignItems="center" gap={1}>
            {trend !== undefined && (
              <Box display="flex" alignItems="center">
                {trend >= 0 ? (
                  <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: trend >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 600,
                    ml: 0.5,
                  }}
                >
                  {Math.abs(trend)}%
                </Typography>
              </Box>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;