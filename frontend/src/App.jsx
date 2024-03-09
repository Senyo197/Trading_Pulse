import React from "react";
import "./Components/index.css";
import NotFound from "./Components/NotFound";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AUDChart from "./Components/AUDChart";
import USDChart from "./Components/USDChart";

export default function App() {
  return (
    <Router>
      <Layout>
        {/* Rendering AUDChart and USDChart components */}
        <AUDChart />
        <USDChart />
        {/* End of rendering AUDChart and USDChart components */}
        <Routes>
          {/* Remove the existing routes for AUDChart and USDChart */}
          {/* <Route exact path="/" element={<AUDChart />} />
          <Route exact path="/" element={<USDChart />} /> */}
          {/* End of removing existing routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
