import React, { useState } from "react";
import "./Sidebar.css"; // Ensure this file contains the updated styles
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // State for active menu

  const handleToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Toggle the menu
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set the active menu
    handleToggle(menu); // Toggle the menu when clicked
  };

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu</li>

            {/* Dashboard */}
            <li>
              <Link
                to="/dashboard"
                className={`waves-effect ${
                  activeMenu === "dashboard" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("dashboard")}
              >
                <i className="bx bx-home"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Profile Settings */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "profile" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("profile")}
              >
                <i className="bx bx-user"></i>
                <span>Profile Settings</span>
              </Link>
              <ul
                className={`sub-menu ${openMenu === "profile" ? "show" : ""}`}
                aria-expanded={openMenu === "profile"}
              >
                <li>
                  <Link to="#" className="waves-effect">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Apps</li>

            {/* Categories */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "categories" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("categories")}
              >
                <i className="bx bx-grid-alt"></i>
                <span>Categories</span>
              </Link>
              <ul
                className={`sub-menu ${
                  openMenu === "categories" ? "show" : ""
                }`}
                aria-expanded={openMenu === "categories"}
              >
                <li>
                  <Link to="/listing-category" className="waves-effect">
                    Listing Category
                  </Link>
                </li>
                <li>
                  <Link to="/product-category" className="waves-effect">
                    Product Category
                  </Link>
                </li>
              </ul>
            </li>

            {/* Enquiry */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "enquiry" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("enquiry")}
              >
                <i className="bx bx-envelope"></i>
                <span>Enquiry</span>
              </Link>
              <ul
                className={`sub-menu ${openMenu === "enquiry" ? "show" : ""}`}
                aria-expanded={openMenu === "enquiry"}
              >
                <li>
                  <Link to="/listing-enquiry" className="waves-effect">
                    Listing Enquiry
                  </Link>
                </li>
                <li>
                  <Link to="/product-enquiry" className="waves-effect">
                    Product Enquiry
                  </Link>
                </li>
              </ul>
            </li>

            {/* Reviews */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "reviews" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("reviews")}
              >
                <i className="bx bx-star"></i>
                <span>Reviews</span>
              </Link>
              <ul
                className={`sub-menu ${openMenu === "reviews" ? "show" : ""}`}
                aria-expanded={openMenu === "reviews"}
              >
                <li>
                  <Link to="/listing-reviews" className="waves-effect">
                    Listing Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/product-reviews" className="waves-effect">
                    Product Reviews
                  </Link>
                </li>
              </ul>
            </li>

            {/* Keywords */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "keywords" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("keywords")}
              >
                <i className="bx bx-search"></i>
                <span>Keywords</span>
              </Link>
              <ul
                className={`sub-menu ${openMenu === "keywords" ? "show" : ""}`}
                aria-expanded={openMenu === "keywords"}
              >
                <li>
                  <Link to="#" className="waves-effect">
                    Listing Keywords
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    Product Keywords
                  </Link>
                </li>
              </ul>
            </li>

            {/* Location */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "location" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("location")}
              >
                <i className="bx bx-globe"></i>
                <span>Location</span>
              </Link>
              <ul
                className={`sub-menu ${openMenu === "location" ? "show" : ""}`}
                aria-expanded={openMenu === "location"}
              >
                <li>
                  <Link to="#" className="waves-effect">
                    Countries
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    States
                  </Link>
                </li>
              </ul>
            </li>

            {/* Business Listings */}
            <li>
              <Link
                to="#"
                className={`has-arrow waves-effect ${
                  activeMenu === "business-listing" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("business-listing")}
              >
                <i className="bx bx-building-house"></i>
                <span>Business Listings</span>
              </Link>
              <ul
                className={`sub-menu ${
                  openMenu === "business-listing" ? "show" : ""
                }`}
                aria-expanded={openMenu === "business-listing"}
              >
                <li>
                  <Link to="#" className="waves-effect">
                    Organizations
                  </Link>
                </li>
                <li>
                  <Link to="#" className="waves-effect">
                    Brands
                  </Link>
                </li>
              </ul>
            </li>

            {/* Advertisements */}
            <li>
              <Link
                to="#"
                className={`waves-effect ${
                  activeMenu === "advertisement" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("advertisement")}
              >
                <i className="bx bx-briefcase-alt"></i>
                <span>Advertisements</span>
              </Link>
            </li>

            {/* Subscription Packages */}
            <li>
              <Link
                to="#"
                className={`waves-effect ${
                  activeMenu === "subscription-package" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("subscription-package")}
              >
                <i className="bx bx-box"></i>
                <span>Subscription Packages</span>
              </Link>
            </li>

            {/* Insights */}
            <li>
              <Link
                to="#"
                className={`waves-effect ${
                  activeMenu === "insights" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("insights")}
              >
                <i className="bx bx-bar-chart"></i>
                <span>Insights</span>
              </Link>
            </li>

            {/* User Management */}
            <li>
              <Link
                to="#"
                className={`waves-effect ${
                  activeMenu === "user-management" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("user-management")}
              >
                <i className="bx bxs-group"></i>
                <span>User Management</span>
              </Link>
            </li>

            {/* Additional menu items can be added similarly */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
