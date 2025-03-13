import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function OrderHistoryBox(props) {
  const { order } = props;
  const dataProduct = order.products;
  return (
    <div>
      {" "}
      <div className="mx-auto w-full rounded-md border bg-white px-4 pt-4 pb-5">
        <div className="flex justify-between border-b pb-2">
          <p className="text-base">
            <span className="font-semibold">Đơn hàng:</span> {order.id}
          </p>
          <p className="text-base">
            {order.status === "Đã hủy" ? (
              <span className="font-semibold text-red-600">{order.status}</span>
            ) : order.status === "Đã giao" ? (
              <span className="font-semibold text-blue-600">
                {order.status}
              </span>
            ) : order.status === "Đang xử lý" ? (
              <span className="font-semibold text-yellow-600">
                {order.status}
              </span>
            ) : (
              <span className="font-semibold text-green-600">
                {order.status}
              </span>
            )}
          </p>
        </div>
        {dataProduct.slice(0, 3).map((product, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 pt-4">
              <div className="col-span-2 flex justify-center">
                <img
                  src={product.image_url}
                  alt="Product"
                  className="h-20 w-20"
                />
              </div>
              <div className="col-span-6">
                <p className="text-lg">{product.name}</p>
                <p className="font-semibold">x3</p>
              </div>
              <div className="col-span-4">
                <p className="text-end text-base">
                  {product.discount > 0 ? (
                    <>
                      <span className="mr-2 text-gray-400 line-through">
                        {product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="text-red-500">
                        {(
                          product.price *
                          (1 - product.discount / 100)
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
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
          </div>
        ))}
        <div className="grid grid-cols-12">
          <div className="col-span-2 col-start-11">
            <Link to={`/account/order-history/${order.id}`}>
              <Button variant="more" className="w-full">
                Xem chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
