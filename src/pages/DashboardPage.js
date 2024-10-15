// DashboardPage.js
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
