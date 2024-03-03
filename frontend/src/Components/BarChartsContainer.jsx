import React from "react";
import BarChart from "./BarChart";

const BarChartsContainer = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <BarChart
        chartData={{
          labels: ["January", "February", "March"],
          datasets: [
            {
              label: "Sales Chart 1",
              data: [65, 59, 80],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
            },
          ],
        }}
      />
      <BarChart
        chartData={{
          labels: ["April", "May", "June"],
          datasets: [
            {
              label: "Sales Chart 2",
              data: [81, 56, 55],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
            },
          ],
        }}
      />
      <BarChart
        chartData={{
          labels: ["July", "August", "September"],
          datasets: [
            {
              label: "Sales Chart 3",
              data: [70, 55, 40],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChartsContainer;
