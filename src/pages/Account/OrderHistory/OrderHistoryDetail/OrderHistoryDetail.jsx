import { data } from "@/database/data";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import OrderProductBox from "@/components/OrderProductBox/OrderProductBox";
import { CreditCard, Phone, Store, User } from "lucide-react";

export default function OrderHistoryDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const foundOrder = data.orders.find((p) => p.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      console.log(foundOrder);
    }
  }, [id]);

  //   id: "HD03219312321222",
  //   customer_id: 102,
  //   products: [
  //     {
  //       product_id: 3,
  //       name: "Đồ Chơi Lắp Ghép Xe Đua",
  //       quantity: 1,
  //       price: 1500000,
  //       image_url: "https://cdn.shopify.com/s/files/1/0731/6514/4343/files/thap-banh-cupcake-ngot-ngao-playdoh-g0529_1.jpg?v=1741104026&width=400",
  //       discount: 0
  //     }
  //   ],
  //   total_price: 1500000,
  //   status: "Hoàn thành",
  //   order_date: "2025-03-10T15:45:00Z",
  //   payment_method: "Thẻ tín dụng",
  //   shipping_address: {
  //     full_name: "Trần Thị B",
  //     phone: "0901234567",
  //     address: "456 Đường Nguyễn Trãi, Quận 5, TP.HCM"
  //   }
  // }

  return (
    <div>
      <div>
        <p className="mb-4 text-2xl">Chi tiết đơn hàng</p>
        <div className="mt-2 flex justify-between">
          <div>
            <p className="text-base">
              Mã đơn hàng:{" "}
              <span className="mt-2 font-bold">{order.id}</span>{" "}
            </p>
            <p className="text-base">
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
            {order.status === "Đã hủy" ? (
              <Badge variant="destructive"> {order.status}</Badge>
            ) : order.status === "Đã giao" ? (
              <Badge variant="success"> {order.status}</Badge>
            ) : order.status === "Đang xử lý" ? (
              <Badge variant="processing"> {order.status}</Badge>
            ) : order.status === "Đang giao" ? (
              <Badge variant="shipped"> {order.status}</Badge>
            ) : (
              <Badge variant="default"> {order.status}</Badge>
            )}
          </div>
        </div>
        <div className="mt-5">
          {order?.products?.map((product) => (
            <>
              <OrderProductBox product={product} key={product.id} />
            </>
          ))}
        </div>
        <div className="my-5">
          <div className="border-b px-6 py-4">
            <div className="flex items-center text-lg font-semibold text-red-600">
              Thông tin thanh toán
            </div>
            <div className="mt-3 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Tổng tiền sản phẩm:</span>
                <span>{order?.total_price?.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá:</span>
                <span className="text-red-500">
                  {order?.total_price?.toLocaleString()}đ
                </span>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Phải thanh toán:</span>
                <span className="text-black">
                  {order?.total_price?.toLocaleString()}đ
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Đã thanh toán:</span>
                <span className="text-green-600">
                  {order?.total_price?.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto my-5 rounded-lg bg-white px-6 py-4">
            <div className="flex items-center text-lg font-semibold text-gray-800">
              Thông tin khách hàng
            </div>
            <div className="mt-3 space-y-2 text-gray-700">
              <div className="flex items-center">
                <User className="mr-2 text-gray-500" />
                <span>{order?.shipping_address?.full_name}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-500" />
                <span>{order?.shipping_address?.phone}</span>
              </div>
              <div className="flex items-center">
                <Store className="mr-2 text-gray-500" />
                <span>{order?.shipping_address?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
