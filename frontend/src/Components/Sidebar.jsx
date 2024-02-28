import React from "react";
import logo from "@Images/eagle-logo.png";

const Sidebar = () => {
  return (
    <nav className="bg-gray-600 text-white flex-col hidden md:flex w-24">
      <div>
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 ml-2 mb-24 filter brightness-0 invert"
        />
      </div>
    </nav>
  );
};

export default Sidebar;
