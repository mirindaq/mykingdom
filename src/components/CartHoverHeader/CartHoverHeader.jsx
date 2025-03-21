import { Button } from "@/components/ui/button";
import { ShoppingBasket, Trash } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";

import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import { useState } from "react";
import { useCart } from "@/hooks/CartContext";
import CartItemBox from "../CartItemBox/CartItemBox";

export default function CartHoverHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const { cart, totalItems } = useCart();

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

  return (
    <HoverCard
      openDelay={100}
      closeDelay={100}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <HoverCardTrigger asChild>
        <Link to={path.cart}>
          <Button
            size="headerOption"
            className={`flex items-center gap-2 text-base font-semibold ${isOpen ? "bg-white text-red-500" : "bg-red-600 hover:bg-white hover:text-red-500"}`}
          >
            <ShoppingBasket />
            <div className="hidden xl:block">Giỏ hàng ({totalItems})</div>
          </Button>
        </Link>
      </HoverCardTrigger>

      <HoverCardContent
        align="end"
        className="w-xl rounded-lg bg-white p-6 shadow-lg"
      >
        <div>
          {cart.length > 0 ? (
            <>
              <ul className="max-h-72 space-y-4 overflow-y-auto">
                {cart.map((item, index) => (
                  <CartItemBox item={item} key={index} />
                ))}
              </ul>
              <div className="mt-4 flex items-center text-sm">
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

              <div className="mt-4 text-right text-xl font-bold text-red-600">
                Tổng cộng: {totalPrice.toLocaleString()}đ
              </div>

              <div className="mt-5 flex justify-between gap-4">
                <Link to={path.cart} className="w-1/2">
                  <button className="w-full rounded-lg border border-red-500 bg-white py-2 text-red-500 hover:cursor-pointer hover:bg-gray-100">
                    Xem giỏ hàng
                  </button>
                </Link>
                <Link to={path.pay} className="w-1/2">
                  <button
                    className={`w-full rounded-lg py-2 ${
                      agree
                        ? "bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
                    }`}
                    disabled={!agree}
                  >
                    Thanh toán ngay
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-2xl font-bold text-red-500">
                Giỏ hàng của bạn đang trống
              </p>
              <Link to={path.collections}>
                <Button className="mt-5 w-full bg-red-600 text-white hover:bg-red-700">
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
