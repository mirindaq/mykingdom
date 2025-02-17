import Homepage from "@/pages/Homepage/Homepage";
import { path } from "../constants/path";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login/Login";

const useRouteElements = () => {
  const routes = [
    {
      path: path.homepage,
      element: <MainLayout />,
      children: [
        {
          path: path.homepage,
          element: <Homepage />,
        },
        {
          path: path.login,
          element: <Login />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default useRouteElements;
