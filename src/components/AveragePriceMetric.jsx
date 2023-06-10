import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AveragePrice = () => {
  const [averagePrice, setAveragePrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        const totalPrices = products.reduce((total, product) => total + product.price, 0);
        const average = totalPrices / products.length;
        setAveragePrice(average);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <p>Precio promedio de los productos: ${averagePrice.toFixed(2)}</p>
      )}
    </div>
  );
};

export default AveragePrice;
