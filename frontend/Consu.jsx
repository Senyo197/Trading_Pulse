// Your React.js component

import React, { useEffect, useState } from "react";
import axios from "axios";

const EconomicEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/economic-events/", {
          params: {
            currency: "USD",
            impact_level: "H",
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Economic Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.event_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EconomicEvents;
