import React from "react";
import { SearchInput } from "../ui/input";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { ShoppingBasket, SquareUser, Truck } from "lucide-react";

export default function Header() {
  return (
    <>
      <header className="flex justify-center bg-red-600">
        <div className="container flex items-center gap-5 py-6">
          <div>
            <img
              src="https://www.mykingdom.com.vn/cdn/shop/files/logo-254x76_1.png?v=1697473116&width=200"
              alt="logo"
            />
          </div>
          <div>
            {" "}
            <SearchInput type="text" placeholder="Nhập từ khóa để tìm kiếm" />
          </div>
          <div>
            <ul>
              <li className="flex">
                <ButtonWithIcon icon={<Truck />} title={"Theo dõi đơn hàng"} />
                <ButtonWithIcon icon={<SquareUser />} title={"Tài khoản"} />
                <ButtonWithIcon icon={<ShoppingBasket />} title={"Giỏ hàng"} />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
