import React, { useState } from 'react';
import TotalProductsMetric from './TotalProductsMetric';
import TotalOrdersMetric from './TotalOrdersMetric';
import TotalRevenueMetric from './TotalRevenueMetric';
import AveragePriceMetric from './AveragePriceMetric';
import TopSellingProducts from './TopSellingProducts';
import "../style/Dashboard.css";


const Dashboard = () => {
  const [sortBy, setSortBy] = useState('orders');

  const sortProducts = (productsData, sortBy) => {
    switch (sortBy) {
      case 'orders':
        return productsData.sort((a, b) => b.orders - a.orders);
      case 'price':
        return productsData.sort((a, b) => a.price - b.price);
      default:
        return productsData;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      <div className="metrics-container">
        <TotalProductsMetric />
        <TotalOrdersMetric />
        <TotalRevenueMetric />
        <AveragePriceMetric />
        <TopSellingProducts sortProducts={sortProducts} sortBy={sortBy} />
      </div>
    </div>
  );
};

export default Dashboard;
