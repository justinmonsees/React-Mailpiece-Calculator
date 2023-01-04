import React from "react";

import "./css/index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import GlobalStore from "./components/context/GlobalContext";

import MainApp from "./components/MainApp";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import ManagePaper from "./pages/ManagePaper";
import Saved from "./pages/Saved";

function App() {
  return (
    <GlobalStore>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<MainApp />}>
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/manage-papers" element={<ManagePaper />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
    </GlobalStore>
  );
}

export default App;
