import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"; // Import CategoryScale from chart.js

Chart.register(CategoryScale);

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "My Sales",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const MyBarChart = () => {
  const chartRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current) {
      const canvas = chartRef.current;

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(canvas, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            x: {
              type: "category",
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          responsive: true,
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          barPercentage: 0.5,
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [screenWidth]);

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MyBarChart;
