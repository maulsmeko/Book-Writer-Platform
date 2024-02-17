import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import Layout from "../layout";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";

export const Router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "edit-book/:type/:id",
        element: <EditBook />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];
