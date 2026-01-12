import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Bar chart showing stock distribution across warehouses
 */
const WarehouseStockChart = ({ data }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Stock Distribution by Warehouse
        </Typography>
        <Box sx={{ width: '100%', height: 300, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="code" 
                tick={{ fill: '#558B2F' }}
                tickLine={{ stroke: '#558B2F' }}
              />
              <YAxis 
                tick={{ fill: '#558B2F' }}
                tickLine={{ stroke: '#558B2F' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e0e0e0',
                  borderRadius: 8 
                }}
              />
              <Legend />
              <Bar 
                dataKey="totalStock" 
                fill="#4CAF50" 
                name="Total Stock"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WarehouseStockChart;