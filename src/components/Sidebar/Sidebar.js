import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

// Reusable component for a menu item
const MenuItem = ({
  icon,
  label,
  link,
  subMenus,
  activeMenu,
  activeSubMenu,
  openMenu,
  handleMenuClick,
  handleSubMenuClick,
}) => (
  <li>
    <Link
      to={subMenus ? "#" : link}
      className={`has-arrow waves-effect ${
        activeMenu === label ? "active" : ""
      }`}
      onClick={() => handleMenuClick(label)}
    >
      <i className={icon}></i>
      <span>{label}</span>
    </Link>
    {subMenus && (
      <ul
        className={`sub-menu ${openMenu === label ? "show" : ""}`}
        aria-expanded={openMenu === label}
      >
        {subMenus.map((subMenu, index) => (
          <li key={index}>
            <Link
              to={subMenu.link}
              className={`waves-effect ${
                activeSubMenu === subMenu.label ? "active" : ""
              }`}
              onClick={() => handleSubMenuClick(label, subMenu.label)}
            >
              {subMenu.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Track active submenu

  // Load active menu and submenu from localStorage on component mount
  useEffect(() => {
    const savedActiveMenu = localStorage.getItem("activeMenu");
    const savedOpenMenu = localStorage.getItem("openMenu");
    const savedActiveSubMenu = localStorage.getItem("activeSubMenu");

    if (savedActiveMenu) setActiveMenu(savedActiveMenu);
    if (savedOpenMenu) setOpenMenu(savedOpenMenu);
    if (savedActiveSubMenu) setActiveSubMenu(savedActiveSubMenu);
  }, []);

  // Save active menu and submenu to localStorage
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setOpenMenu(openMenu === menu ? null : menu);
    localStorage.setItem("activeMenu", menu);
    localStorage.setItem("openMenu", openMenu === menu ? null : menu);
    setActiveSubMenu(null); // Reset submenu when switching main menus
    localStorage.removeItem("activeSubMenu");
  };

  const handleSubMenuClick = (menu, subMenu) => {
    setActiveMenu(menu);
    setActiveSubMenu(subMenu);
    setOpenMenu(menu);
    localStorage.setItem("activeMenu", menu);
    localStorage.setItem("openMenu", menu);
    localStorage.setItem("activeSubMenu", subMenu);
  };

  // Menu configuration
  const menuItems = [
    { icon: "bx bx-home", label: "Dashboard", link: "/dashboard" },
    {
      icon: "bx bx-user",
      label: "Profile Settings",
      subMenus: [
        { label: "Change Password", link: "#" },
        { label: "Logout", link: "#" },
      ],
    },
    {
      icon: "bx bx-grid-alt",
      label: "Categories",
      subMenus: [
        { label: "Listing Category", link: "/listing-category" },
        { label: "Product Category", link: "/product-category" },
      ],
    },
    {
      icon: "bx bx-envelope",
      label: "Enquiry",
      subMenus: [
        { label: "Listing Enquiry", link: "/listing-enquiry" },
        { label: "Product Enquiry", link: "/product-enquiry" },
      ],
    },
    {
      icon: "bx bx-star",
      label: "Reviews",
      subMenus: [
        { label: "Listing Reviews", link: "/listing-reviews" },
        { label: "Product Reviews", link: "/product-reviews" },
      ],
    },
    { icon: "bx bx-search", label: "Keywords", link: "/listing-keywords" },
    {
      icon: "bx bx-globe",
      label: "Location",
      subMenus: [
        { label: "Countries", link: "/listing-country" },
        { label: "States", link: "/listing-state" },
      ],
    },
    {
      icon: "bx bx-building-house",
      label: "Business Listings",
      subMenus: [
        { label: "Organizations", link: "#" },
        { label: "Brands", link: "#" },
      ],
    },
    {
      icon: "bx bx-briefcase-alt",
      label: "Advertisements",
      link: "/listing-ads",
    },
    {
      icon: "bx bx-box",
      label: "Subscription Packages",
      link: "/listing-package",
    },
    { icon: "bx bx-bar-chart", label: "Insights", link: "/insights" },
    { icon: "bx bxs-group", label: "User Management", link: "#" },
  ];

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu</li>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.link}
                subMenus={item.subMenus}
                activeMenu={activeMenu}
                activeSubMenu={activeSubMenu}
                openMenu={openMenu}
                handleMenuClick={handleMenuClick}
                handleSubMenuClick={handleSubMenuClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
