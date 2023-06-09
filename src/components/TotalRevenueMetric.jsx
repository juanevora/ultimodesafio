import React from 'react';

const TotalRevenueMetric = ({ totalRevenue }) => {
  return (
    <div className="metric">
      <div className="metric-label">Ingresos totales</div>
      <div className="metric-value">{`$${totalRevenue}`}</div>
    </div>
  );
};

export default TotalRevenueMetric;
