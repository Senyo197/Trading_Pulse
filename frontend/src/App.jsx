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
        <div className="flex">
          <Routes>
            <Route exact path="/aud" element={<AUDChart />} />
            <Route exact path="/usd" element={<USDChart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}
