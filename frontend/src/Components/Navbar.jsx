import React, { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material"; // Import Material-UI icons
import logo from "@Images/eagle-logo.png";

export default function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <nav className="md:flex md:justify-between md:items-center md:h-16 md:overflow-y-auto bg-black h-16 overflow-y-auto">
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="Logo"
          className="ml-4 my-2 h-12 w-12 filter brightness-0 invert"
        />
        <button
          onClick={toggleNavbar}
          className="md:hidden py-4 px-4 text-white"
          aria-label="Toggle Navbar"
        >
          <MenuIcon className="text-xl" />
        </button>
      </div>
      {isNavbarVisible && (
        <div className="md:flex md:items-center">
          {/* Add your navigation links here */}
        </div>
      )}
    </nav>
  );
}
