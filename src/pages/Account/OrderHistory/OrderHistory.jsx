import OrderHistoryBox from "@/components/OrderHistoryBox/OrderHistoryBox";
import { useState } from "react";
export default function OrderHistory() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <>
      <p className="mb-4 text-2xl">Lịch sử mua hàng</p>
      <div className="mb-3">
        {/* <ul className="w-full flex justify-start gap-3">
            <RadioButton
              id="status-all"
              value="all"
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              labelText="All"
              className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-400 rounded-md cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            />
            <RadioButton
              id="status-pending"
              value="pending"
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              labelText="Pending"
              className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-400 rounded-md cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            />
            <RadioButton
              id="status-confirmed"
              value="confirmed"
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              labelText="Confirmed"
              className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-400 rounded-md cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            />
            <RadioButton
              id="status-shipping"
              value="shipping"
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              labelText="Shipping"
              className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-400 rounded-md cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            />
            <RadioButton
              id="status-canceled"
              value="canceled"
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              labelText="Canceled"
              className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-400 rounded-md cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            />
            <RadioButton
              id="status-completed"
              value="completed"
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              labelText="Completed"
              className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-400 rounded-md cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            />
          </ul> */}
      </div>
      <div className="flex flex-col gap-3">
        <OrderHistoryBox />
        <OrderHistoryBox />
      </div>
    </>
  );
}
