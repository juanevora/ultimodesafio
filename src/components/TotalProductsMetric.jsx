import React from 'react';

const TotalProductsMetric = ({ totalProducts }) => {
  return (
    <div className="metric">
      <div className="metric-label">Total de productos</div>
      <div className="metric-value">{totalProducts}</div>
    </div>
  );
};

export default TotalProductsMetric;
