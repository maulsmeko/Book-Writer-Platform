import React from "react";
import "../assets/css/header.css";
import { Dropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import profile from "../assets/images/profile.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const authData = localStorage.getItem("userData");
  const user = JSON.parse(authData);

  const logoutUser = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="white"
        className="w-100 header-main"
      >
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="cursor-pointer"
        ></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav "
          style={{ backgroundColor: "white" }}
        >
          <Nav className="mr-auto w-100">
            <div className="sidebar-main" style={{ height: "fit-content" }}>
              <div className="nav-part">
                <button
                  className="btn btn-add mb-3"
                  onClick={() => navigate("/add-book")}
                >
                  + Add Book
                </button>

                <div className="top-navpart">
                  <div
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => {}}
                  >
                    <div className={`nav-btn`}>
                      <img src="" alt="" className={`icon`} />
                      <p className="text">Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Nav>
          <Nav className="w-100">
            <div className="profile-part">
              <div className="profile">
                <img
                  src={profile}
                  style={{ borderRadius: "55%" }}
                  height={"40px"}
                  width={"40px"}
                  alt="User Profile"
                />
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-profile" className="btn-custom">
                    {user?.user?.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={logoutUser}>Logout </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* ... other dropdown items */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
