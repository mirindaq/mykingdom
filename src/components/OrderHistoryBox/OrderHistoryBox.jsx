import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function OrderHistoryBox(props) {
  const { order } = props;
  const dataProduct = order.items;
  return (
    <div>
      {" "}
      <div className="mx-auto w-full rounded-md border bg-white px-4 pt-4 pb-5">
        <div className="flex justify-between border-b pb-2">
          <p className="text-base">
            <span className="font-semibold text-lg">Đơn hàng:</span>{" "}
            <span className="uppercase">{order._id}</span>
          </p>
          <p className="text-base">
            {order.status === "pending" ? (
              <span className="font-semibold text-lg text-yellow-600">
                Đang chờ xử lý
              </span>
            ) : order.status === "processing" ? (
              <span className="font-semibold text-lg text-blue-600">Đang xử lý</span>
            ) : order.status === "shipped" ? (
              <span className="font-semibold text-lg text-purple-600">
                Đang giao hàng
              </span>
            ) : order.status === "delivered" ? (
              <span className="font-semibold text-lg text-green-600">Đã giao</span>
            ) : order.status === "cancelled" ? (
              <span className="font-semibold text-lg text-red-600">Đã hủy</span>
            ) : (
              <span className="font-semibold text-lg text-gray-600">
                Trạng thái không xác định
              </span>
            )}
          </p>
        </div>
        {dataProduct.slice(0, 3).map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 pt-5">
              <div className="col-span-2 flex justify-center">
                <img
                  src={item.product.image_url}
                  alt="Product"
                  className="h-20 w-20"
                />
              </div>
              <div className="col-span-6">
                <p className="text-lg">{item.product.name}</p>
                <p className="font-semibold text-base">x3</p>
              </div>
              <div className="col-span-4">
                <p className="text-end text-lg">
                  {item.discount > 0 ? (
                    <>
                      <span>
                        {(
                          item.price *
                          (1 - item.discount / 100)
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </>
                  ) : (
                    <span>
                      {item.price.toLocaleString("vi-VN", {
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
            <Link to={`/account/order-history/${order._id}`}>
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
