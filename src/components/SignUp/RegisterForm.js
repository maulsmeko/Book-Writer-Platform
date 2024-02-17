import React, { useState } from "react";
import "../../assets/css/login.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };
  const [registerData, setRegisterData] = useState(initialValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data", registerData);
    try {
      const response = await fetch("http://localhost:9000/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      console.log(data, response, "res");
      if (!response.ok && data) {
        toast.error(data);
      } else if (response.ok && data.accessToken) {
        localStorage.setItem("userData", JSON.stringify(data));
        toast.success("User registered successfully!");
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
            <h3>Register</h3>
          </div>
          <div className="middle-form">
            <div className="filed w-100">
              <input
                name="name"
                placeholder="Enter your name"
                className="form-control w-100"
                type="text"
                value={registerData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="filed w-100">
              <input
                name="email"
                type="email"
                className="form-control w-100"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="filed w-100">
              <input
                name="password"
                className="form-control w-100"
                placeholder="Enter your password"
                type="password"
                value={registerData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="filed w-100">
              <select
                name="role"
                className="form-control w-100"
                type="text"
                value={registerData.role}
                onChange={(e) => handleChange(e)}
              >
                <option disabled value="">
                  Select your role
                </option>
                <option value="author">Author</option>
                <option value="collaborator">Collaborator</option>
              </select>
            </div>
          </div>
          <div className="action-part">
            <button type="submit" className="btn btn-orange">Sign Up</button>
            <div className="text-center w-100 mt-3">
              <p className="text-secondary m-0">Already have an account?</p>
              <Link to={"/auth/login"} className="info-text">Login to your account</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
