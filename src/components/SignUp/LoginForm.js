import React, { useState } from "react";
import "../../assets/css/login.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data", loginData);
    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log(data, response, "res");
      if (!response.ok && data) {
        toast.error(data);
      } else if (response.ok && data.accessToken) {
        localStorage.setItem("userData", JSON.stringify(data));
        toast.success("User logged in successfully!");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      toast.error("Failed" + error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <form className="container" onSubmit={handleSubmit}>
        <div className="content">
          <div className="header-part">
          <h3>Welcome!</h3>
          <p>Sign in to your account.</p>
          </div>
          <div className="middle-form">
            <div className="filed w-100">
              <input
                name="email"
                type="email"
                className="form-control w-100"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="filed w-100">
              <input
                name="password"
                className="form-control w-100"
                placeholder="Enter your password"
                type="password"
                value={loginData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="action-part">
            <button type="submit" className="btn btn-orange">Login</button>
            <div className="text-center w-100 mt-3">
              <p className="text-secondary m-0">Don't have an account?</p>
              <Link to={"/auth/register"} className="info-text">Register here</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
