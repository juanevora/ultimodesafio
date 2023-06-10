import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import '../style/TotalOrdersMetric.css'; // Importa el archivo CSS

const TotalOrdersMetric = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, BarController, BarElement);

    const ordersData = [10, 20, 30, 40, 50];

    const ctx = chartRef.current.getContext('2d');
    const previousChart = Chart.getChart(ctx);
    if (previousChart) {
      previousChart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Total Orders',
            data: ordersData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return <canvas className="chartCanvas" ref={chartRef} />;
};

export default TotalOrdersMetric;


