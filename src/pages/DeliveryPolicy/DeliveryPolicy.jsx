import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import React from "react";

export default function DeliveryPolicy() {
  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    { path: "/delivery-policy", label: "Chính sách giao hàng" },
  ];
  return (
    <div
      style={{
        backgroundImage: `url('/images/background.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData} />
      </div>
      <div className="container mx-auto py-10">
        <img src="/images/chinh-sach-giao-hang.webp" alt="chinhSachGiaoHang" className="rounded-3xl"/>
      </div>
    </div>
  );
}
