import React from "react";
import { Button } from "../ui/button";

export default function OrderHistoryBox() {
  return (
    <div>
      {" "}
      <div className="mx-auto w-full rounded-md border bg-white px-4 pt-4 pb-5">
        <div className="flex justify-between border-b pb-2">
          <p className="text-base">
            <span className="font-semibold">Đơn hàng:</span> #123456789
          </p>
          <p className="text-base">
            <span className="font-semibold text-green-500">Đã giao hàng</span>
          </p>
        </div>
        <div className="grid grid-cols-12 pt-4">
          <div className="col-span-2 flex justify-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0731/6514/4343/files/thu-thach-phau-thuat-classic-operation-hasbro-gaming-g0951_9.jpg?v=1741102666&width=400"
              alt="Product"
              className="h-20 w-20"
            />
          </div>
          <div className="col-span-6">
            <p className="text-base">Bộ đồ chơi Lego lắp ráp</p>
            <p>Số lượng: 3</p>
          </div>
          <div className="col-span-4">
            <p className="text-end text-base">
              <span className="font-semibold">Tổng tiền:</span> $100.00
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-2 col-start-11">
            <Button variant="more" className="w-full">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
