import React, { useEffect, useState } from 'react';
import TotalProductsMetric from './TotalProductsMetric';
import TotalOrdersMetric from './TotalOrdersMetric';
import TotalRevenueMetric from './TotalRevenueMetric';
import AveragePriceMetric from './AveragePriceMetric';
import BestSellingProductsMetric from './BestSellingProductsMetric';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetricsData = async () => {
      setLoading(true);

      try {
        // Fetch total products
        const productsResponse = await fetch('', {
          headers: {
            'X-Shopify-Access-Token': 'YOUR_SHOPIFY_ACCESS_TOKEN',
          },
        });
        const productsData = await productsResponse.json();
        setTotalProducts(productsData.count);

        // Fetch total orders
        const ordersResponse = await fetch('', {
          headers: {
            'X-Shopify-Access-Token': 'YOUR_SHOPIFY_ACCESS_TOKEN',
          },
        });
        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData.count);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMetricsData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        const productsData = await productsResponse.json();
        setBestSellingProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Panel de Control</h1>
      <div className="metrics">
        <TotalProductsMetric totalProducts={totalProducts} />
        <TotalOrdersMetric totalOrders={totalOrders} />
        <TotalRevenueMetric totalRevenue={totalRevenue} />
        <AveragePriceMetric averagePrice={averagePrice} />
        <BestSellingProductsMetric bestSellingProducts={bestSellingProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
