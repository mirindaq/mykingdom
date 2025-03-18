import Homepage from "@/pages/Homepage/Homepage";
import { path } from "../constants/path";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
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
import TermsAndConditions from "@/pages/TermsAndConditions/TermsAndConditions";
import Pay from "@/pages/Pay/Pay";
import { useAuth } from "@/hooks/AuthContext";
import Exclusive from "@/pages/Exclusive/Exclusive";

// Bảo vệ route cần đăng nhập
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}

// Ngăn người dùng đã đăng nhập vào trang Login/Register
function GuestRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={path.homepage} /> : <Outlet />;
}

const useRouteElements = () => {
  const routes = [
    {
      path: path.homepage,
      element: <MainLayout />,
      children: [
        { path: path.homepage, element: <Homepage /> },
        { path: path.product, element: <Product /> },
        { path: path.brands, element: <Brand /> },
        { path: path.blogs, element: <Blog /> },
        { path: path.collections, element: <Collection /> },
        { path: path.membership, element: <Membership /> },
        { path: path.cart, element: <Cart /> },
        { path: path.termsAndConditions, element: <TermsAndConditions /> },
        { path: path.exclusive, element: <Exclusive /> },

        // Chặn truy cập Login/Register nếu đã đăng nhập
        {
          element: <GuestRoute />,
          children: [
            { path: path.login, element: <Login /> },
            { path: path.register, element: <Register /> },
          ],
        },

        // Các route cần đăng nhập
        {
          element: <ProtectedRoute />,
          children: [
            { path: path.pay, element: <Pay /> },
            {
              path: path.account,
              element: <Account />,
              children: [
                { path: "", element: <AccountOverview /> },
                { path: path.orderHistory, element: <OrderHistory /> },
                {
                  path: path.orderHistoryDetail,
                  element: <OrderHistoryDetail />,
                },
                { path: path.wishlist, element: <Wishlist /> },
                { path: path.address, element: <Address /> },
              ],
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
