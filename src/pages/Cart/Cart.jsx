import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CartItemPage from "@/components/CartItemPage/CartItemPage";
import { Checkbox } from "@/components/ui/checkbox";
import { path } from "@/constants/path";

import { useCart } from "@/hooks/CartContext";

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, totalItems } = useCart();

  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    { path: "/cart", label: "Giỏ hàng" },
  ];

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (item.product.discount
        ? item.product.price - (item.product.discount * item.product.price) / 100
        : item.product.price) *
        item.quantity,
    0,
  );

  const [agree, setAgree] = useState(false);

  if (totalItems <= 0)
    return (
      <div className="bg-amber-50 py-10">
        <div className="flex items-center justify-center">
          <p className="mt-10 mb-3 ml-4 text-4xl font-bold">
            Giỏ hàng của bạn đang trống
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <img src="/images/emptyCart.png" alt="" className="w-sm" />
          </div>
          <div className="flex items-center justify-center pb-10">
            <Link to={path.collections}>
              <button className="rounded-xl bg-red-600 px-20 py-3 text-base font-bold text-white hover:cursor-pointer">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  else
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
                  <CartItemPage item={item} key={item.product._id} />
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
                <p className="text-lg font-medium">
                  {totalPrice.toLocaleString()} Đ
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p>Giảm giá:</p>
                <p className="text-lg font-medium">0%</p>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <p>Tổng cộng:</p>
                <p className="text-2xl font-medium text-red-600">
                  {totalPrice.toLocaleString()} Đ
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <Link to={path.pay} className="w-full">
                  <button
                    className={`w-full rounded-xl py-3 text-base font-bold ${
                      agree
                        ? "bg-red-600 text-white hover:cursor-pointer"
                        : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                    disabled={!agree}
                  >
                    Thanh toán ngay
                  </button>
                </Link>
              </div>

              <div className="mt-5 flex items-center text-sm">
                <Checkbox
                  id="agree-terms"
                  className="mr-2"
                  checked={agree}
                  onCheckedChange={setAgree}
                />
                <label htmlFor="agree-terms">
                  Tôi đã đọc và đồng ý với
                  <Link to={path.termsAndConditions}>
                    <span className="ml-1 text-blue-600 underline">
                      điều khoản
                    </span>
                  </Link>{" "}
                  và
                  <Link to={path.termsAndConditions}>
                    <span className="ml-1 text-blue-600 underline">
                      điều kiện thanh toán
                    </span>
                  </Link>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
