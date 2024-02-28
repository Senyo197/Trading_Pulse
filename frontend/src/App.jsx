import React from "react";
import "./Components/index.css";
import NotFound from "./Components/NotFound";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./Components/Content";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Content />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
