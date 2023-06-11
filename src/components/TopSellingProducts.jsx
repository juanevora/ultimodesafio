import React, { useState, useEffect, useMemo } from 'react';



const TopSellingProductsMetric = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.sort((a, b) => b.rating.count - a.rating.count);
        const topProducts = sortedProducts.slice(0, 5);
        setTopSellingProducts(topProducts);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div>
      <h3>Productos más vendidos</h3>
      <ul>
        {topSellingProducts.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProductsMetric;
