import React, { useState } from "react";
import RegisterForm from "../components/SignUp/RegisterForm";
import "../assets/css/login.css";
import signUpBook from "../assets/images/signup-book.jpg";

const Signup = () => {
  return (
    <div className="login-main">
      <div className="content-wrapper">
        <div className="banner-part">
          <div className="banner-content">
            <img src={signUpBook} alt="signUp" />
            <div className="text-part">
              <h4>Book Writer Platform</h4>
              <p>Welcome to Book Writer Platform. Your ultimate platform for crafting stories. Seamlessly create, collaborate, and publish your masterpiece. Unleash your creativity with our intuitive React web interface today!</p>
            </div>
          </div>
        </div>
        <div className="form-part">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
