import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalRevenueMetric = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/orders')
      .then((response) => response.json())
      .then((data) => {
        const revenue = data.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(revenue);
      })
      .catch((error) => {
        console.error('Error al obtener los pedidos:', error);
      });
  }, []);

  return (
    <div>
      <h3>Ingresos totales generados</h3>
      <p>{`$${totalRevenue}`}</p>
    </div>
  );
};

export default TotalRevenueMetric;
