import React, { useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { FaBars, FaSearch } from "react-icons/fa";
import { BiCustomize, BiFullscreen, BiBell } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import avatar from "../../assets/images/users/avatar-1.jpg";

const Header = () => {
  const headerRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (headerRef.current.requestFullscreen) {
        headerRef.current.requestFullscreen();
      } else if (headerRef.current.mozRequestFullScreen) {
        // Firefox
        headerRef.current.mozRequestFullScreen();
      } else if (headerRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        headerRef.current.webkitRequestFullscreen();
      } else if (headerRef.current.msRequestFullscreen) {
        // IE/Edge
        headerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header id="page-topbar" ref={headerRef}>
      <div className="navbar-header">
        <div className="d-flex">
          {/* LOGO */}
          <div className="navbar-brand-box">
            <a href="index.html" className="logo logo-dark">
              <span className="logo-sm">
                <img src="/fmcg.svg" alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src="/FMCG.png" alt="" height="22" />
              </span>
            </a>
          </div>



          {/* App Search */}
          <Form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <span className="bx bx-search-alt"></span>
            </div>
          </Form>
        </div>

        <div className="d-flex">
          {/* Mobile Search */}
          <Dropdown className="d-inline-block d-lg-none ms-2">
            <Dropdown.Toggle
              variant="link"
              className="btn header-item noti-icon waves-effect"
              id="page-header-search-dropdown"
            >
              <FaSearch />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-lg dropdown-menu-end p-0">
              <Form className="p-3">
                <Form.Group className="m-0">
                  <div className="input-group">
                    <Form.Control type="text" placeholder="Search ..." />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Dropdown.Menu>
          </Dropdown>

          {/* Fullscreen Button */}
          <button
            type="button"
            className="btn header-item waves-effect"
            onClick={toggleFullscreen}
          >
            <BiFullscreen />
          </button>

          {/* Notifications Dropdown */}
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle
              variant="link"
              className="btn header-item noti-icon waves-effect"
              id="page-header-notifications-dropdown"
            >
              <BiBell className="bx-tada" />
              <span className="badge bg-danger rounded-pill">3</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-lg dropdown-menu-end p-0">
              <div className="p-3">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="m-0">Notifications</h6>
                  </div>
                  <div className="col-auto">
                    <a href="#!" className="small">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div data-simplebar style={{ maxHeight: "230px" }}>
                {/* Notification Items */}
                <a
                  href="javascript:void(0);"
                  className="text-reset notification-item"
                >
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <BsFillChatDotsFill />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">Your order is placed</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          If several languages coalesce the grammar
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline"></i>{" "}
                          <span>3 min ago</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                {/* Add more notification items here */}
              </div>
              <div className="p-2 border-top d-grid">
                <a
                  className="btn btn-sm btn-link font-size-14 text-center"
                  href="javascript:void(0)"
                >
                  <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                  <span>View More..</span>
                </a>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          {/* User Dropdown */}
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle
              variant="link"
              className="btn header-item waves-effect"
              id="page-header-user-dropdown"
            >
              <img
                className="rounded-circle header-profile-user"
                src={avatar}
                alt="Header Avatar"
              />
              <span className="d-none d-xl-inline-block ms-1">Henry</span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item href="#">
                <i className="bx bx-user font-size-16 align-middle me-1"></i>
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="bx bx-wallet font-size-16 align-middle me-1"></i>
                My Wallet
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <span className="badge bg-success float-end">11</span>
                <i className="bx bx-wrench font-size-16 align-middle me-1"></i>
                Settings
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>
                Lock screen
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger" href="#">
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
