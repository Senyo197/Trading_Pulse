import React, { useState } from "react";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material"; // Import Material-UI icons
import logo from "@Images/eagle-logo.png";

export default function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const closeNavbar = () => {
    setIsNavbarVisible(false);
  };

  return (
    <nav className="md:hidden bg-gray-600 h-16 overflow-y-auto">
      <div className="flex justify-between">
        <img
          src={logo}
          alt="Logo"
          className="ml-4 my-2 h-12 w-12 filter brightness-0 invert"
        />
        <button
          onClick={toggleNavbar}
          className="py-4 px-4 text-white"
          aria-label="Toggle Navbar"
        >
          {isNavbarVisible ? (
            <CloseIcon className="text-2xl px-4" />
          ) : (
            <MenuIcon className="text-xl" />
          )}
        </button>
      </div>

      {isNavbarVisible && (
        <div className="fixed top-0 left-0 px-4 bg-gray-600 h-full w-full flex flex-col text-white">
          <button onClick={closeNavbar}>
            <CloseIcon className="text-2xl mb-24" />
          </button>
        </div>
      )}
    </nav>
  );
}
