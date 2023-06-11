import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalProductsMetric = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setTotalProducts(data.length);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div>
      <h3>Número total de productos</h3>
      <p>{totalProducts}</p>
    </div>
  );
};

export default TotalProductsMetric;
