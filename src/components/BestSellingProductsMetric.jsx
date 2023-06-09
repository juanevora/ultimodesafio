import React from 'react';

const BestSellingProductsMetric = ({ bestSellingProducts }) => {
  return (
    <div className="metric">
      <div className="metric-label">Productos más vendidos</div>
      <div className="metric-value">
        <ul>
          {bestSellingProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestSellingProductsMetric;
