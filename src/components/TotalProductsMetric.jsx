import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setTotalProducts(response.data.length);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTotalProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <p>Número total de productos: {totalProducts}</p>
      )}
    </div>
  );
};

export default TotalProducts;
