import React, { useState } from "react";
import logo from "@Images/eagle-logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeChart, setActiveChart] = useState("");

  const handleLogoClick = () => {
    setActiveChart(""); // Clear the active icon when the logo is clicked
  };

  const handleSetActive = (chart) => {
    setActiveChart(chart);
  };

  return (
    <nav className="bg-black text-white flex flex-col h-screen w-24">
      <div>
        <Link to="/" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 ml-2 mb-24 filter brightness-0 invert"
          />
        </Link>
      </div>
      <div className="flex flex-col h-full justify-normal items-center">
        <Link
          to="/usd"
          className={`sidebar-item mb-8 ${activeChart === "usd" ? "active" : ""}`}
          onClick={() => handleSetActive("usd")}
        >
          USD
        </Link>
        <Link
          to="/aud"
          className={`sidebar-item mb-8 ${activeChart === "aud" ? "active" : ""}`}
          onClick={() => handleSetActive("aud")}
        >
          AUD
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
