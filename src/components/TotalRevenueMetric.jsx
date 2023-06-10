import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/orders');
        const orders = response.data;
        const revenue = orders.reduce((total, order) => total + order.total, 0);
        setTotalRevenue(revenue);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <p>Ingresos totales generados: ${totalRevenue.toFixed(2)}</p>
      )}
    </div>
  );
};

export default TotalRevenue;
