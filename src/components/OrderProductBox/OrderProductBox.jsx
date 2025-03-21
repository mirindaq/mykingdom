import React from "react";
import { Link } from "react-router-dom";

const OrderProductBox = ({ product, quantity, discount }) => {
  return (
    <div className="my-2 rounded-lg border border-gray-200 bg-white px-5 py-3">
      <div className="flex justify-between pb-2">
        <div className="flex items-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-32 w-32 rounded object-cover"
          />
          <div className="ml-4 flex-1">
            <div className="">
              <a
                href={product.name}
                className="text-lg text-blue-600 hover:underline"
              >
                {product.name}
              </a>
            </div>
            <p className="text-base text-gray-700">
              Số lượng:{" "}
              <span className="font-semibold text-red-500">{quantity}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-end text-base">
            {discount > 0 ? (
              <>
                <span className="mr-2 text-gray-400 line-through">
                  {product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <span className="text-red-500">
                  {(product.price * (1 - discount / 100)).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    },
                  )}
                </span>
              </>
            ) : (
              <span>
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="text-right">
        <div className="space-x-2">
          <Link to={`/collections/${product.slug}`}>
            <button className="rounded border-red-500 px-3 py-1 text-base text-red-500 hover:cursor-pointer hover:bg-red-50">
              Đánh giá
            </button>
          </Link>
          <Link to={`/collections/${product.slug}`}>
            <button className="rounded bg-red-500 px-3 py-1 text-base text-white hover:cursor-pointer hover:bg-red-600">
              Mua lại
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderProductBox;
