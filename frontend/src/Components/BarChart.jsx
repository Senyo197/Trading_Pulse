import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import chart.js

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

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // Get the chart instance
      const chartInstance = chartRef.current.chartInstance;

      // Check if the chart is already created
      if (chartInstance) {
        // Destroy the existing chart instance if it exists
        chartInstance.destroy();
      }

      // Create a new chart instance
      new Chart(chartRef.current, {
        type: "bar",
        data: chartData,
        options: {
          // Add chart options here
          scales: {
            x: {
              // Use the registered CategoryScale from chart.js
              type: "category",
            },
          },
        },
      });
    }
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <Bar
        ref={chartRef}
        data={chartData}
        options={
          {
            /* Add options here */
          }
        }
      />
    </div>
  );
};

export default MyBarChart;
