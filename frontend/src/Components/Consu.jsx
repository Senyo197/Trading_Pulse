import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";

const Consu = () => {
  const [lowEvents, setLowEvents] = useState([]);
  const [moderateEvents, setModerateEvents] = useState([]);
  const [highEvents, setHighEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const impactLevels = ['L', 'M', 'H'];

        for (const impact of impactLevels) {
          const response = await axios.get("http://127.0.0.1:8000/api/economic-events/", {
            params: {
              currency: "USD",
              impact_level: impact,
            },
          });

          if (impact === 'L') {
            setLowEvents(response.data);
          } else if (impact === 'M') {
            setModerateEvents(response.data);
          } else {
            setHighEvents(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const countOutcomes = (eventsData) => {
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    eventsData.forEach(data => {
      if (data.outcome === 'positive') {
        positiveCount++;
      } else if (data.outcome === 'negative') {
        negativeCount++;
      } else {
        neutralCount++;
      }
    });

    return { positiveCount, negativeCount, neutralCount };
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Low Impact',
        data: [countOutcomes(lowEvents).positiveCount, countOutcomes(lowEvents).negativeCount, countOutcomes(lowEvents).neutralCount],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Moderate Impact',
        data: [countOutcomes(moderateEvents).positiveCount, countOutcomes(moderateEvents).negativeCount, countOutcomes(moderateEvents).neutralCount],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'High Impact',
        data: [countOutcomes(highEvents).positiveCount, countOutcomes(highEvents).negativeCount, countOutcomes(highEvents).neutralCount],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h1>Economic Events</h1>
      <BarChart chartData={chartData} />
    </div>
  );
};

export default Consu;

