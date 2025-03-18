import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { path } from "@/constants/path";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function Membership() {
  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.membership, label: "Chương trình thành viên" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="container mx-auto rounded-lg py-14 ">
        {/* Phần tiêu đề */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600">
            Chương trình thành viên Mykingdom
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700">
            Mykingdom hân hoan thông báo, kể từ ngày 01/05/2023, Mykingdom chính
            thức tham gia chương trình thành viên My Points do Công ty Việt Tinh
            Anh vận hành. Giờ đây, thành viên của Mykingdom sẽ được tích điểm và
            sử dụng quyền lợi tại tất các các hệ thống cửa hàng tham gia chương
            trình My Points như Hobiverse, Clever Collection. Chương trình thành
            viên cũ sẽ không còn hiệu lực, các quyền lợi tích điểm đến hiện tại
            của thành viên Mykingdom sẽ được tự động chuyển toàn bộ sang chương
            trình My Points kể từ thời gian này.
          </p>
        </div>

        {/* Banner hình ảnh - hiển thị 4 ảnh xếp dọc */}
        <div className="my-6 flex flex-col items-center gap-4">
          <img
            src="/images/Banner_website.webp"
            alt="Banner 1"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src="/images/Banner_website2.webp"
            alt="Banner 2"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src="/images/Banner_website3.webp"
            alt="Banner 3"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src="/images/Banner_website4.webp"
            alt="Banner 4"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src="/images/Banner_website5.webp"
            alt="Banner 5"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Nút xem điều kiện & điều khoản */}
        <div className="my-7 flex justify-center">
          <Link to="/terms-and-conditions">
            <button className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600">
              Xem thêm điều kiện và điều khoản
            </button>
          </Link>
        </div>

        {/* Câu hỏi thường gặp */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-lg bg-white p-4 shadow-lg"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                Làm thế nào để trở thành thành viên My Points?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bạn có thể đăng ký thành viên My Points miễn phí tại cửa hàng
                Mykingdom hoặc trên website chính thức. Chỉ cần cung cấp số điện
                thoại để kích hoạt tài khoản.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                Tôi có thể tích lũy điểm như thế nào?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bạn sẽ nhận được điểm thưởng trên mỗi giao dịch mua hàng tại
                Mykingdom. Cứ mỗi 10.000đ chi tiêu, bạn sẽ tích lũy được 1 điểm.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                Điểm tích lũy có thể dùng để làm gì?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bạn có thể sử dụng điểm tích lũy để đổi lấy phiếu giảm giá hoặc
                quà tặng độc quyền từ Mykingdom.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full rounded-lg bg-white p-4 shadow-lg"
          >
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                Điểm tích lũy có thời hạn sử dụng không?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Có, điểm tích lũy có thời hạn sử dụng trong vòng 12 tháng kể từ
                ngày tích điểm. Sau thời gian này, điểm sẽ tự động hết hiệu lực.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                Tôi có thể kiểm tra số điểm của mình ở đâu?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bạn có thể kiểm tra số điểm tích lũy của mình trên ứng dụng
                Mykingdom hoặc hỏi nhân viên tại quầy thanh toán.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                Chương trình có áp dụng cho các thương hiệu khác không?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Có, My Points áp dụng tại các thương hiệu đối tác như Hobiverse,
                Clever Collection và nhiều hệ thống khác.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
