import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CartItemPage from "@/components/CartItemPage/CartItemPage";

import { useCart } from "@/hooks/CartContext";
import React from "react";

export default function Cart() {
  const { cart, totalItems } = useCart();

  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    { path: "/cart", label: "Giỏ hàng" },
  ];

  return (
    <div>
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData} />
      </div>
      <div className="container mx-auto mb-10">
        <div>
          <p className="mt-10 mb-10 ml-4 text-4xl font-medium text-blue-900">
            Giỏ hàng của bạn
          </p>
        </div>
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-7 grid grid-cols-1 items-center pr-30">
            <ul className="space-y-4">
              {cart.map((item) => (
                <CartItemPage item={item} key={item.id} />
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between">
              <p>Tổng cộng:</p>
              <p className="text-lg font-medium">{totalItems} sản phẩm</p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="mt-5 flex items-center justify-between">
              <p>Tiền hàng hóa:</p>
              <p className="text-lg font-medium">{totalItems} sản phẩm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
