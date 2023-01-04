import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainApp = () => {
  return (
    <div className="wrapper main-wrapper d-flex">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
