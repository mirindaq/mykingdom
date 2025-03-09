import { Button } from "@/components/ui/button";
import { ShoppingBasket, Trash } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/CartContext";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import { useState } from "react";

export default function CartHoverHeader() {
  const { cart, addToCart, reduceFromCart, removeFromCart, totalItems } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

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
    <HoverCard
      openDelay={0}
      closeDelay={100}
      open={isOpen}
      onOpenChange={setIsOpen} // Cập nhật trạng thái mở
    >
      <HoverCardTrigger asChild>
        <Button
          size="headerOption"
          className={`flex items-center gap-2 text-base font-semibold ${isOpen ? "bg-white text-red-500" : "bg-red-600 hover:bg-white hover:text-red-500"}`}
        >
          <ShoppingBasket />
          <div className="hidden xl:block">Giỏ hàng ({totalItems})</div>
        </Button>
      </HoverCardTrigger>

      <HoverCardContent
        align="end"
        className="w-xl rounded-lg bg-white p-6 shadow-lg"
      >
        <div>
          {cart.length > 0 ? (
            <ul className="max-h-72 space-y-4 overflow-y-auto">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <img
                    src={item.image_url[0]}
                    alt={item.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="ml-3 flex flex-1 flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => reduceFromCart(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500"
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-red-600">
                      {item.discount
                        ? `${((item.price - (item.discount * item.price) / 100) * item.quantity).toLocaleString()}đ`
                        : `${(item.price * item.quantity).toLocaleString()}đ`}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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

          {cart.length > 0 && (
            <div className="mt-4 flex items-center text-sm">
              <Checkbox id="agree-terms" className="mr-2" />
              <label htmlFor="agree-terms">
                Tôi đã đọc và đồng ý với
                <a href="#" className="ml-1 text-blue-600 underline">
                  điều khoản
                </a>{" "}
                và
                <a href="#" className="ml-1 text-blue-600 underline">
                  điều kiện thanh toán
                </a>
              </label>
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-4 text-right text-xl font-bold text-red-600">
              Tổng cộng: {totalPrice.toLocaleString()}đ
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-5 flex justify-between gap-4">
              <Button className="w-1/2 border border-red-500 bg-white text-red-500 hover:bg-gray-100">
                Xem giỏ hàng
              </Button>
              <Button className="w-1/2 bg-red-600 text-white hover:bg-red-700">
                Thanh toán ngay
              </Button>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
