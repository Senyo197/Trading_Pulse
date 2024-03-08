import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";

const Consu = () => {
  const [lowEvents, setLowEvents] = useState([]);
  const [moderateEvents, setModerateEvents] = useState([]);
  const [highEvents, setHighEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Default empty value for custom date
  const [customDateMode, setCustomDateMode] = useState(false); // Default to not searching custom dates

  useEffect(() => {
    if (!customDateMode) {
      fetchData(selectedDate);
    }
  }, [selectedDate, customDateMode]);

  const fetchData = async (date) => {
    try {
      const impactLevels = ['L', 'M', 'H'];
      const fetchedData = {};

      for (const impact of impactLevels) {
        const response = await axios.get("http://127.0.0.1:8000/api/economic-events/", {
          params: {
            currency: "USD",
            impact_level: impact,
            date: date
          },
        });

        fetchedData[impact] = response.data;
      }

      setLowEvents(fetchedData['L']);
      setModerateEvents(fetchedData['M']);
      setHighEvents(fetchedData['H']);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        borderColor: 'rgba(0, 168, 243, 1)',
        borderWidth: 1
      },
      {
        label: 'Neutral',
        data: [
          countOutcomes(lowEvents).neutralCount,
          countOutcomes(moderateEvents).neutralCount,
          countOutcomes(highEvents).neutralCount
        ],
        backgroundColor: 'rgba(88, 88, 88, 0.8)',
        borderColor: 'rgba(88, 88, 88, 1)',
        borderWidth: 1
      },
      {
        label: 'Negative',
        data: [
          countOutcomes(lowEvents).negativeCount,
          countOutcomes(moderateEvents).negativeCount,
          countOutcomes(lowEvents).negativeCount
        ],
        backgroundColor: 'rgba(236, 28, 36, 0.8)',
        borderColor: 'rgba(236, 28, 36, 1)',
        borderWidth: 1
      }
    ]
  };

  const handleCustomDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const toggleCustomDateMode = () => {
    setCustomDateMode(!customDateMode);
  };

  return (
    <div>
      <h1>Economic Events</h1>
      <div>
        <label>
          <input type="checkbox" checked={customDateMode} onChange={toggleCustomDateMode} />
          Search Custom Dates
        </label>
        {customDateMode && (
          <input type="date" value={selectedDate} onChange={handleCustomDateChange} />
        )}
      </div>
      <BarChart chartData={chartData} />
    </div>
  );
};

export default Consu;

