import React, { useState } from "react";
import logo from "@Images/eagle-logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [activeChart, setActiveChart] = useState("");

  const handleLogoClick = () => {
    setActiveChart(""); // Clear the active icon when the logo is clicked
  };

  const handleSetActive = (chart) => {
    setActiveChart(chart);
  };


  return (
    <nav className="md:hidden h-16 bg-black sticky left-0 w-screen">
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="Logo"
          className="ml-4 my-2 h-12 w-12 filter brightness-0 invert"
        />
      </div>
      <div className="">
        <Link
          to="/usd"
          className={` ${activeChart === "usd" ? "active" : ""}`}
          onClick={() => handleSetActive("usd")}
        >
          USD
        </Link>
        <Link
          to="/aud"
          className={` ${activeChart === "aud" ? "active" : ""}`}
          onClick={() => handleSetActive("aud")}
        >
          AUD
        </Link>
      </div>
    </nav>
  );
}
