import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(userData)
  const location = useLocation()
  return data?.accessToken ? (
    <Navigate to="/" />
  ) : (
    <>
      {location.pathname === "/auth/login" ||
      location.pathname === "/auth/register" ? (
        <Outlet />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default AuthLayout;
