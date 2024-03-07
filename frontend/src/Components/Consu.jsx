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
      } else if (data.outcome === 'neutral') {
        neutralCount++;
      } else if (data.outcome === 'negative') {
        negativeCount++;
      }
    });

    return { positiveCount, neutralCount, negativeCount };
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: ['Low', 'Moderate', 'High'],
    datasets: [
      {
        label: 'Positive',
        data: [
          countOutcomes(lowEvents).positiveCount,
          countOutcomes(moderateEvents).positiveCount,
          countOutcomes(highEvents).positiveCount
        ],
        backgroundColor: 'rgba(0, 168, 243)',
        borderWidth: 1
      },
      {
        label: 'Neutral',
        data: [
          countOutcomes(lowEvents).neutralCount,
          countOutcomes(moderateEvents).neutralCount,
          countOutcomes(highEvents).neutralCount
        ],
        backgroundColor: 'rgba(88, 88, 88)',
        borderWidth: 1
      },
      {
        label: 'Negative',
        data: [
          countOutcomes(lowEvents).negativeCount,
          countOutcomes(moderateEvents).negativeCount,
          countOutcomes(lowEvents).negativeCount
        ],
        backgroundColor: 'rgba(236, 28, 36)',
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

