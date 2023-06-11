import React, { useEffect, useState } from 'react';

const TotalOrdersMetric = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/orders')
      .then((response) => response.json())
      .then((data) => {
        setTotalOrders(data.length);
      })
      .catch((error) => {
        console.error('Error al obtener los pedidos:', error);
      });
  }, []);

  return (
    <div>
      <h3>Número total de pedidos realizados</h3>
      <p>{totalOrders}</p>
    </div>
  );
};

export default TotalOrdersMetric;
