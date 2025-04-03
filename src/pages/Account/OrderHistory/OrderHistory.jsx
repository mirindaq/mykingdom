import OrderHistoryBox from "@/components/OrderHistoryBox/OrderHistoryBox";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { orderApi } from "@/services/order.api";
import { PaginationBox } from "@/components/PaginationBox/PaginationBox";
import { useParams, useSearchParams } from "react-router-dom";

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 2;

  useEffect(() => {
    if (!user?.user?._id) return;
    setLoading(true);
    orderApi.getUserOrders(user.user._id, currentPage, limit).then((res) => {
      console.log(res);
      setOrders(res.orders);
      setTotalPages(res.pagination.totalPages);
      setLoading(false);
    });
  }, [user?.user?._id, currentPage, limit]);

  const handlePageChange = (page) => {
    setSearchParams({ page, limit });
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold">Lịch sử mua hàng</div>
      {loading ? (
        <div className="flex items-center justify-center mt-30">
          <div className="h-20 w-20 animate-spin rounded-full border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : orders?.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {orders?.map((order) => (
              <OrderHistoryBox key={order._id} order={order} />
            ))}
          </div>
          <div className="mt-5">
            <PaginationBox
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
}
