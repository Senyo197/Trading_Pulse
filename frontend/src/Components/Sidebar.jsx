import React from "react";
import logo from "@Images/eagle-logo.png";
import USDChart from "./USDChart";
import AUDChart from "./AUDChart";

const Sidebar = () => {
  return (
    <nav className="bg-black text-white flex flex-col h-screen w-24">
      <div className="mt-2 mb-6">
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 ml-2 filter brightness-0 invert"
        />
      </div>
      <div className="sidebar-item flex flex-col">
        <h2 className="mb-2">USD Chart</h2>
        <USDChart />
      </div>
      <div className="sidebar-item flex flex-col mt-4">
        <h2 className="mb-2">AUD Chart</h2>
        <AUDChart />
      </div>
    </nav>
  );
};

export default Sidebar;
