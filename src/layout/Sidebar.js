import React, { useState } from "react";
import "../assets/css/sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import homeActive from "../assets/images/homeActive.svg";
import logout from "../assets/images/signOut.svg";
import home from "../assets/images/home.svg";

const Sidebar = () => {
  const location = useLocation();
  const activePage = location.pathname.replace("/", "");
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    setTimeout(()=>{
      navigate("/auth/login");
    },3000)
  };

  const authUser = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="sidebar-main">
        <div className="logo-part">
          <h4>Writer Platform</h4>
        </div>
        {authUser?.user?.role === "author" && (
          <button className="btn btn-add" onClick={() => navigate("/add-book")}>
            + Add Book
          </button>
        )}

        {/* </Link> */}
        <div className="nav-part">
          <div className="top-navpart">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className={` ${
                  activePage === "home" ? "nav-btn active" : "nav-btn"
                }`}
              >
                <img
                  src={activePage === "home" ? homeActive : home}
                  alt=""
                  className="icon"
                />
                <p className="text">Home</p>
              </div>
            </Link>

            <div
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => logoutUser()}
            >
              <div className={`nav-btn`}>
                <img src={logout} alt="" className={`icon`} />
                <p className="text">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
