import React from "react";

import "./css/index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import ManagePaper from "./pages/ManagePaper";
import Saved from "./pages/Saved";

function App() {
  return (
    <div className="wrapper d-flex">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/manage-papers" element={<ManagePaper />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
