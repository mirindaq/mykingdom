import OrderHistoryBox from "@/components/OrderHistoryBox/OrderHistoryBox";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { orderApi } from "@/api/order.api";
export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    orderApi.getUserOrders(user.user._id).then((res) => {
      setOrders(res);
    });
  }, []);
  return (
    <>
      <p className="mb-4 text-2xl font-bold">Lịch sử mua hàng</p>
      {orders?.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {orders?.map((order) => (
              <OrderHistoryBox key={order._id} order={order} />
            ))}
          </div>
        </>
      ) : (
        <p>
          <div>
            <img
              src="/images/noArticle.webp"
              alt="No_news"
              className="mx-auto mt-5 w-1/2"
            />
            <div className="text-center text-lg font-semibold text-gray-500">
              Bạn chưa thực hiện đơn hàng nào
            </div>
          </div>
        </p>
      )}
    </>
  );
}
