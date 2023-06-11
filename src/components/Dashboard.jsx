import React, { useEffect, useState } from 'react';
import TotalProductsMetric from './TotalProductsMetric';
import TotalOrdersMetric from './TotalOrdersMetric';
import TotalRevenueMetric from './TotalRevenueMetric';
import AveragePriceMetric from './AveragePriceMetric';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import Footer from './Footer';
import '../style/Dashboard.css';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [sortText, setSortText] = useState('Predeterminado');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener el número total de productos
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setTotalProducts(data.length);
      })
      .catch((error) => {
        console.error('Error al obtener el número total de productos:', error);
      });

    // Obtener el número total de pedidos
    fetch('https://fakestoreapi.com/orders')
      .then((response) => response.json())
      .then((data) => {
        setTotalOrders(data.length);
      })
      .catch((error) => {
        console.error('Error al obtener el número total de pedidos:', error);
      });

    // Obtener los ingresos totales generados
    fetch('https://fakestoreapi.com/orders')
      .then((response) => response.json())
      .then((data) => {
        const revenue = data.reduce((total, order) => total + order.total, 0);
        setTotalRevenue(revenue);
      })
      .catch((error) => {
        console.error('Error al obtener los ingresos totales generados:', error);
      });

    // Obtener el precio promedio de los productos
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        const prices = data.map((product) => product.price);
        const average = prices.reduce((total, price) => total + price, 0) / prices.length;
        setAveragePrice(average);
      })
      .catch((error) => {
        console.error('Error al obtener el precio promedio de los productos:', error);
      });

    // Obtener todos los productos
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        let sortedProducts = data;

        // Ordenar los productos según la opción seleccionada
        if (sortOption === 'price') {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'rating.count') {
          sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        }

        // Obtener los 5 productos más vendidos
        const topSelling = sortedProducts.slice(0, 5);
        setTopSellingProducts(topSelling);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los productos más vendidos:', error);
      });

    // Actualizar el texto de la opción de clasificación seleccionada
    if (sortOption === 'default') {
      setSortText('Predeterminado');
    } else if (sortOption === 'price') {
      setSortText('Precio');
    } else if (sortOption === 'rating.count') {
      setSortText('Número de ventas');
    }
  }, [sortOption]);

  // Obtener los datos para el gráfico de barras
  const barChartData = topSellingProducts.map((product) => ({
    x: product.title,
    y: product.rating.count,
  }));

  return (
    <div>
      <h1>Panel de Control</h1>

      <TotalProductsMetric totalProducts={totalProducts} />
      <TotalOrdersMetric totalOrders={totalOrders} />
      <TotalRevenueMetric totalRevenue={totalRevenue} />
      <AveragePriceMetric averagePrice={averagePrice} />

      <div>
        <h3>Productos más vendidos</h3>
        <label htmlFor="sortOption">Ordenar por:</label>
        <select id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">Predeterminado</option>
          <option value="price">Precio</option>
          <option value="rating.count">Número de ventas</option>
        </select>
        <p>Ordenado por: {sortText}</p>
        {isLoading ? (
          <p>Cargando productos más vendidos...</p>
        ) : (
          <ul>
            {topSellingProducts.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="chart-container">
  <h3 className="chart-header">Gráfico de barras</h3>
  <VictoryChart domainPadding={20}>
    <VictoryAxis />
    <VictoryAxis dependentAxis />
    <VictoryBar data={barChartData} x="x" y="y" className="chart" />
  </VictoryChart>
</div>


      <Footer />
    </div>
  );
};

export default Dashboard;

