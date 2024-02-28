import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <div className="sticky left-0 top-0 h-screen flex">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        {/* Added left margin to accommodate the sidebar width */}
        <Navbar />
        <main className="flex-grow p-8">{children}</main>
      </div>
    </div>
  );
}
