// src/routes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate here
import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import ListingCategory from "./pages/Catogory/Listing/ListingCategory";
import ProductCategory from "./pages/Catogory/Product/ProductCategory";
import ListingEnquiry from "./pages/Enquiry/Listing/ListingEnquiry";
import ProductEnquiry from "./pages/Enquiry/Product/ProductEnquiry";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="listing-category" element={<ListingCategory />} />
        <Route path="product-category" element={<ProductCategory />} />
        <Route path="listing-enquiry" element={<ListingEnquiry />} />
        <Route path="product-enquiry" element={<ProductEnquiry />} />
        {/* <Route path="profile-settings" element={<ProfileSettings />} /> */}

        {/* Optionally, add a redirect for the root path */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
