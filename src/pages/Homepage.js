// src/pages/Homepage.js
import React from "react";
import Header from "../components/Header/Header"; // Ensure this path is correct
import Sidebar from "../components/Sidebar/Sidebar"; // Ensure this path is correct
import { Outlet } from "react-router-dom"; // This will be used to render child routes
// import "./homePage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <div className="sidebar-and-content">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* This will render the component for the active route */}
        </main>
      </div>
    </div>
  );
};

export default Homepage;
