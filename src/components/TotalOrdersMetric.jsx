import React from 'react';

const TotalOrdersMetric = ({ totalOrders }) => {
  return (
    <div className="metric">
      <div className="metric-label">Total de pedidos</div>
      <div className="metric-value">{totalOrders}</div>
    </div>
  );
};

export default TotalOrdersMetric;
