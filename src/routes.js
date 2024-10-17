// src/routes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate here
import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import ListingCategory from "./pages/Catogory/Listing/ListingCategory";
import ProductCategory from "./pages/Catogory/Product/ProductCategory";
import ListingEnquiry from "./pages/Enquiry/Listing/ListingEnquiry";
import ProductEnquiry from "./pages/Enquiry/Product/ProductEnquiry";
import ListingReview from "./pages/Reviews/Listing/ListingReviews";
import ProductReview from "./pages/Reviews/Product/ProductReviews";
import ListingKeywords from "./pages/Keyword/Listing/ListingKeywords";
import ListingCountries from "./pages/Location/Country/ListingCountries";
import ListingStates from "./pages/Location/State/ListingStates";
import ListingAds from "./pages/Advertisement/ListingAds";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="listing-category" element={<ListingCategory />} />
        <Route path="product-category" element={<ProductCategory />} />
        <Route path="listing-enquiry" element={<ListingEnquiry />} />
        <Route path="product-enquiry" element={<ProductEnquiry />} />
        <Route path="listing-reviews" element={<ListingReview />} />
        <Route path="product-reviews" element={<ProductReview />} />
        <Route path="listing-keywords" element={<ListingKeywords />} />
        <Route path="listing-country" element={<ListingCountries />} />
        <Route path="listing-state" element={<ListingStates />} />
        <Route path="listing-ads" element={<ListingAds />} />
       
        {/* <Route path="profile-settings" element={<ProfileSettings />} /> */}

        {/* Optionally, add a redirect for the root path */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
