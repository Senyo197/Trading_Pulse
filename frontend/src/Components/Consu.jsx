import React, { useEffect, useState } from "react";
import axios from "axios";

const Consu = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/economic-events/", {
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
  }, []); // empty dependency array means this effect runs only once after the initial render

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

export default Consu;

