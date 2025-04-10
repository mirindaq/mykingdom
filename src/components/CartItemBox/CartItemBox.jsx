import React from "react";
import { useCart } from "@/hooks/CartContext";
import { Trash } from "lucide-react";

export default function CartItemBox(props) {
  const { addToCart, reduceFromCart, removeFromCart } = useCart();

  const { item } = props;

  return (
    <div>
      <li
        key={item._id}
        className="flex items-center justify-between border-b pb-3"
      >
        <img
          src={item.product.image_url[0]}
          alt={item.product.name}
          className="h-16 w-16 rounded object-cover"
        />
        <div className="ml-3 flex flex-1 flex-col">
          <span className="text-sm font-medium">{item.product.name}</span>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => reduceFromCart(item.product._id)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500"
            >
              -
            </button>
            <span className="text-lg">{item.quantity}</span>
            <button
              onClick={() => addToCart(item.product, 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-red-600">
            {item.product.discount
              ? `${((item.product.price - (item.product.discount * item.product.price) / 100) * item.quantity).toLocaleString()}đ`
              : `${(item.product.price * item.quantity).toLocaleString()}đ`}
          </span>
          <button
            onClick={() => removeFromCart(item.product._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      </li>
    </div>
  );
}
