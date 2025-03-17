import Homepage from "@/pages/Homepage/Homepage";
import { path } from "../constants/path";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Error404 from "@/pages/Error404/Error404";
import Brand from "@/pages/Brand/Brand";
import Blog from "@/pages/Blog/Blog";
import Collection from "@/pages/Collection/Collection";
import Account from "@/pages/Account/Account";
import AccountOverview from "@/pages/Account/AccountOverview/AccountOverview";
import OrderHistory from "@/pages/Account/OrderHistory/OrderHistory";
import Wishlist from "@/pages/Account/Wishlist/Wishlist";
import Address from "@/pages/Account/Address/Address";
import Membership from "@/pages/Membership/Membership";
import Product from "@/pages/Product/Product";
import Cart from "@/pages/Cart/Cart";
import OrderHistoryDetail from "@/pages/Account/OrderHistory/OrderHistoryDetail/OrderHistoryDetail";

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
          path: path.product,
          element: <Product />,
        },

        {
          path: path.login,
          element: <Login />,
        },
        {
          path: path.register,
          element: <Register />,
        },
        {
          path: path.brands,
          element: <Brand />,
        },
        {
          path: path.blogs,
          element: <Blog />,
        },
        {
          path: path.collections,
          element: <Collection />,
        },
        {
          path: path.membership,
          element: <Membership />,
        },
        {
          path: path.cart,
          element: <Cart />,
        },
        {
          path: path.account,
          element: <Account />,
          children: [
            {
              path: "",
              element: <AccountOverview />,
            },
            {
              path: path.orderHistory,
              element: <OrderHistory />,
            },
            { path: path.orderHistoryDetail, element: <OrderHistoryDetail /> },
            {
              path: path.wishlist,
              element: <Wishlist />,
            },
            {
              path: path.address,
              element: <Address />,
            },
          ],
        },
      ],
    },
    { path: "*", element: <Error404 /> },
  ];
  return useRoutes(routes);
};

export default useRouteElements;
