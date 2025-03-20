import React from "react";
import { SearchInput } from "../ui/input";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { ShoppingBasket, SquareUser, Truck } from "lucide-react";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import CardHoverHeader from "../CartHoverHeader/CartHoverHeader";
import { useAuth } from "@/hooks/AuthContext";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header>
        <div className="flex justify-center bg-red-600">
          <div className="container flex items-center gap-6 py-6">
            <div className="pr-5">
              <Link to={path.homepage}>
                <img
                  src="https://www.mykingdom.com.vn/cdn/shop/files/logo-254x76_1.png?v=1697473116&width=200"
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              {" "}
              <SearchInput
                type="text"
                placeholder="Nhập từ khóa để tìm kiếm (ví dụ: lắp ráp, mô hình, ...)"
              />
            </div>
            <div>
              <ul>
                <li className="flex">
                  <Link to={path.deliveryPolicy}>
                    <ButtonWithIcon
                      icon={<Truck />}
                      title={"Chính sách giao hàng"}
                    />
                  </Link>
                  {isAuthenticated ? (
                    <Link to={path.account}>
                      <ButtonWithIcon
                        icon={<SquareUser />}
                        title={"Tài khoản"}
                      />
                    </Link>
                  ) : (
                    <>
                      {" "}
                      <Link to={path.login}>
                        <ButtonWithIcon
                          icon={<SquareUser />}
                          title={"Đăng nhập"}
                        />
                      </Link>
                    </>
                  )}

                  <CardHoverHeader />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-red-600">
          <Menu />
        </div>
      </header>
    </>
  );
}
