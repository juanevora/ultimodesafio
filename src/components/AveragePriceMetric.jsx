import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AveragePriceMetric = () => {
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        const productPrices = data.map((product) => product.price);
        const totalPrice = productPrices.reduce((acc, price) => acc + price, 0);
        setAveragePrice(totalPrice / data.length);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div>
      <h3>Precio promedio de los productos</h3>
      <p>{`$${averagePrice.toFixed(2)}`}</p>
    </div>
  );
};

export default AveragePriceMetric;
