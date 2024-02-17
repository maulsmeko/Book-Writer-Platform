// import "./App.css";
import { Navigate, useRoutes } from "react-router-dom";
import { Router } from "./router";
import { useEffect } from "react";
import "./assets/css/responsive.css"

function App() {
  const routing = useRoutes(Router);

  return <>{routing}</>;
}

export default App;
