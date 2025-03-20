import React from "react";
import { useCart } from "@/hooks/CartContext";
import { Trash } from "lucide-react";

export default function CartItemPage(props) {
  const { addToCart, reduceFromCart, removeFromCart } = useCart();

  const { item } = props;

  return (
    <div>
      <li
        key={item.id}
        className="flex items-center justify-between border-b pt-4 pb-3"
      >
        <img
          src={item.image_url[0]}
          alt={item.name}
          className="mr-10 h-50 w-50 rounded object-cover"
        />
        <div className="ml-3 flex flex-1 flex-col">
          <span className="text-2xl font-medium">{item.name}</span>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => reduceFromCart(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500"
            >
              -
            </button>
            <span className="text-2xl">{item.quantity}</span>
            <button
              onClick={() => addToCart(item)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="mt-20 w-4 text-lg text-gray-500 underline hover:cursor-pointer hover:text-red-700"
          >
            Xóa
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-red-600">
            {item.discount
              ? `${((item.price - (item.discount * item.price) / 100) * item.quantity).toLocaleString()}đ`
              : `${(item.price * item.quantity).toLocaleString()}đ`}
          </span>
        </div>
      </li>
    </div>
  );
}
