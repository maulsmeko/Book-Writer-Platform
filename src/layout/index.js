import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../assets/css/layout.css";

const Layout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, []);

  return (
    <div className="layout-main">
      <div className="sider">
        <Sidebar />
      </div>
      <div
        className="content-part"
        style={{ position: "relative", paddingLeft: "50px" }}
      >
        <div className="header-part">
          <Header shouldShowSidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
