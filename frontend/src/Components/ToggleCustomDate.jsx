import React, { useState } from "react";

const ToggleCustomDate = ({ handleSearch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(startDate, endDate);
  };

  return (
    <div>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </label>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default ToggleCustomDate;

