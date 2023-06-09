import React from 'react';

const AveragePriceMetric = ({ averagePrice }) => {
  return (
    <div className="metric">
      <div className="metric-label">Precio promedio de productos</div>
      <div className="metric-value">{`$${averagePrice.toFixed(2)}`}</div>
    </div>
  );
};

export default AveragePriceMetric;
