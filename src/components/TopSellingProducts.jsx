import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/TopSellingProducts.css";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('orders');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);

  const fetchTopSellingProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const productsData = response.data;

      let sortedProducts = sortProducts(productsData, sortBy);
      sortedProducts = filterProducts(sortedProducts, filterCategory);

      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
  };

  const handleFilterChange = (e) => {
    const selectedFilterCategory = e.target.value;
    setFilterCategory(selectedFilterCategory);
  };

  const sortProducts = (productsData, sortBy) => {
    switch (sortBy) {
      case 'orders':
        return [...productsData].sort((a, b) => b.orders - a.orders);
      case 'price':
        return [...productsData].sort((a, b) => a.price - b.price);
      default:
        return productsData;
    }
  };

  const filterProducts = (productsData, filterCategory) => {
    if (filterCategory) {
      return productsData.filter((product) => product.category === filterCategory);
    } else {
      return productsData;
    }
  };

  return (
    <div className="top-selling-products">
      <h2>Productos más vendidos</h2>

      <div className="sort-filter-container">
        <label htmlFor="sort-select">Ordenar por:</label>
        <select id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="orders">Número de pedidos</option>
          <option value="price">Precio</option>
        </select>

        <label htmlFor="filter-select">Filtrar por categoría:</label>
        <select id="filter-select" value={filterCategory} onChange={handleFilterChange}>
          <option value="">Todas las categorías</option>
          <option value="electronics">Electrónica</option>
          <option value="clothing">Ropa</option>
          <option value="jewelery">Joyas</option>
          <option value="beauty">Belleza</option>
        </select>
      </div>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-orders">Pedidos: {product.orders}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProducts;
