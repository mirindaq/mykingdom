import { data } from "@/database/data";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import OrderProductBox from "@/components/OrderProductBox/OrderProductBox";
import { CreditCard, Phone, Store, User } from "lucide-react";
import { orderApi } from "@/services/order.api";

export default function OrderHistoryDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    orderApi.getOrderById(id).then((data) => {
      setOrder(data);
    });
  }, [id]);

  const totalPrice = order?.items?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <div>
        <p className="mb-4 text-2xl">Chi tiết đơn hàng</p>
        <div className="mt-2 flex justify-between">
          <div>
            <p className="text-lg">
              Mã đơn hàng:{" "}
              <span className="mt-2 font-bold uppercase">{order._id}</span>{" "}
            </p>
            <p className="text-lg">
              {new Intl.DateTimeFormat("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Ho_Chi_Minh",
              }).format(new Date())}
            </p>
          </div>
          <div>
            {order.status === "pending" ? (
              <Badge variant="pending">Đang chờ xử lý</Badge>
            ) : order.status === "processing" ? (
              <Badge variant="processing">Đang xử lý</Badge>
            ) : order.status === "shipped" ? (
              <Badge variant="shipped">Đang giao hàng</Badge>
            ) : order.status === "delivered" ? (
              <Badge variant="delivered">Đã giao</Badge>
            ) : order.status === "cancelled" ? (
              <Badge variant="cancelled">Đã hủy</Badge>
            ) : (
              <Badge variant="pending">Trạng thái không xác định</Badge>
            )}
          </div>
        </div>
        <div className="mt-5">
          {order?.items?.map((item) => (
            <>
              <OrderProductBox
                product={item.product}
                key={item.product._id}
                quantity={item.quantity}
                discount={item.discount}
              />
            </>
          ))}
        </div>
        <div className="my-5">
          <div className="rounded-lg border-b border-gray-200 bg-white px-6 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Thông tin thanh toán</h3>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-600">Tổng tiền sản phẩm:</span>
                <span className="text-lg font-medium text-red-600">
                  {totalPrice?.toLocaleString()}đ
                </span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-600">Giảm giá:</span>
                <span className="text-lg font-medium text-red-500">
                  {order?.totalDiscount?.toLocaleString()}đ
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Đã thanh toán:</span>
                <span className="text-xl font-bold text-green-600">
                  {order?.totalAmount?.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto my-5 rounded-lg bg-white px-6 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Thông tin người nhận
              </h3>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <span className="font-medium text-gray-800 text-lg">
                    {order?.recipient?.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <span className="font-medium text-gray-800 text-lg">
                    {order?.recipient?.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Store className="mr-3 h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <span className="font-medium text-gray-800 text-lg">
                    {order?.recipient?.address}, {order?.recipient?.ward},{" "}
                    {order?.recipient?.district}, {order?.recipient?.province}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
