import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and manage dashboard data
 */
export const useDashboardData = () => {
  const [data, setData] = useState({
    products: [],
    warehouses: [],
    stockLevels: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [productsRes, warehousesRes, stockLevelsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/warehouses'),
          fetch('/api/stock'),
        ]);

        if (!productsRes.ok || !warehousesRes.ok || !stockLevelsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const products = await productsRes.json();
        const warehouses = await warehousesRes.json();
        const stockLevels = await stockLevelsRes.json();

        setData({
          products,
          warehouses,
          stockLevels,
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};