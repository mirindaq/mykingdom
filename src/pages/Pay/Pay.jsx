import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CartItemPay from "@/components/CartItemPay/CartItemPay";
import FormAddress from "@/components/FormAddress/FormAddress";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/CartContext";

export default function Pay() {
  const [discountCode, setDiscountCode] = useState("");

  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    { path: "/pay", label: "Thanh toán" },
  ];

  const { cart, totalItems } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (item.discount
        ? item.price - (item.discount * item.price) / 100
        : item.price) *
        item.quantity,
    0,
  );

  return (
    <div>
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData} />
      </div>

      <div className="container mx-auto mt-10 mb-10">
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-5 pl-20">
            <p>Liên hệ</p>
            <p className="mt-5">Lê Việt Hoàng (viet04hoang@gmail.com)</p>
            <div className="mt-5 flex items-center">
              <Checkbox id="" className="mr-2" />
              <label htmlFor="">
                Gửi cho tôi tin tức và ưu đãi qua email
              </label>
            </div>
            <div className="mt-5">
              <p className="mb-2">Địa chỉ giao hàng</p>
              <FormAddress />
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div>
                <Link className="text-green-600 underline">
                  Chính sách hoàn tiền
                </Link>
              </div>
              <div>
                <Link className="text-green-600 underline">
                  Chính sách vận chuyển
                </Link>
              </div>
              <div>
                <Link className="text-green-600 underline">
                  Chính sách quyền riêng tư
                </Link>
              </div>
              <div>
                <Link className="text-green-600 underline">
                  Điều khoản dịch vụ
                </Link>
              </div>
              <div>
                <Link className="text-green-600 underline">
                  Thông tin liên hệ
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-5 pr-20 pl-20">
            <ul className="space-y-4">
              {cart.map((item) => (
                <CartItemPay item={item} key={item.id} />
              ))}
            </ul>
            <div className="mt-7 flex items-center justify-between">
              <input
                type="text"
                id="first_name"
                className="w-100 rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
                placeholder="Mã giảm giá hoặc thẻ quà tặng"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button
                className={`rounded-lg px-6 py-3 ${
                  discountCode
                    ? "bg-red-600 text-white hover:cursor-pointer"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
                disabled={!discountCode}
              >
                Áp dụng
              </button>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p>Tổng tiền hàng:</p>
              <p className="text-lg font-medium text-red-600">
                {totalPrice.toLocaleString()} Đ
              </p>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p>Phí vận chuyển:</p>
              <p className="text-lg font-medium text-red-600">MIỄN PHÍ</p>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p className="text-xl">Tổng tiền đơn hàng:</p>
              <p className="text-2xl font-medium text-red-600">
                {totalPrice.toLocaleString()} Đ
              </p>
            </div>

            <div className="mt-7 flex items-center">
              <Checkbox id="" className="mr-2" />
              <label htmlFor="">
                Yêu cầu xuất thông tin VAT
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
