import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SocialBox from "../SocialBox/SocialBox";
import { data } from "@/database/data";
import AnnouncementFooter from "../AnnouncementFooter/AnnouncementFooter";
import { PackageCheck, Store, Truck } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center justify-center">
        <div className="w-full bg-red-700 py-2 flex  justify-evenly mb-5 relative">
          <AnnouncementFooter title="Miễn phí giao hàng đơn từ 500k" icon={<Truck />} />
          <AnnouncementFooter title=" Giao hàng hỏa tốc 4 tiếng" icon={<PackageCheck />} />
          <AnnouncementFooter title=" Hệ thống 210 cửa hàng" icon={<Store />}/>
          <img src="/images/ribbon.svg" className="absolute right-2 -top-9" alt="" />
        </div>
        <div className="container grid grid-cols-12 gap-6 pb-4">
          <div className="col-span-7">
            <img
              src="https://www.mykingdom.com.vn/cdn/shop/files/logo-254x76_1.png?v=1697473116&width=200"
              alt="logo"
            />
            <strong>
              Tham gia ngay để nhận về tay thông tin ưu đãi và hữu ích từ
              Mykingdom
            </strong>
            <div className="mt-3 flex gap-3">
              <Input type="text" placeholder="Nhập email của bạn" />
              <Button className="bg-red-600">Đăng ký</Button>
            </div>
          </div>
          <div className="col-span-5">
            <div>
              <SocialBox data={data.socialMedia} title="Follow Us" />
              <SocialBox data={data.stores} title="Website cùng hệ thống" />
            </div>
          </div>
        </div>
        <div className="w-full border-t border-red-400 py-4"></div>
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-7 grid grid-cols-4 gap-5">
            <div className="col-span-2">
              <span className="text-lg font-bold text-pink-600">
                Thông tin liên hệ
              </span>
              <ul className="mt-3 text-base">
                <li>
                  33-35 đường số D4, khu Đô thị mới Him Lam, Phường Tân Hưng,
                  Quận 7, TP. Hồ Chí Minh
                </li>
                <li>19001208</li>
                <li>hotro@mykingdom.com.vn</li>
                <li>Thứ 2 - Thứ 7 ~ 8:00 - 17:00</li>
                <li>Chủ nhật ~ 8:00 - 12:00</li>
              </ul>
            </div>
            <div className="col-span-2">
              <span className="text-lg font-bold text-pink-600">
                {" "}
                Điều khoản và chính sách
              </span>

              <ul className="mt-3 text-base">
                <li>Chính sách giao hàng</li>
                <li>Chính sách bảo mật</li>
                <li>Chính sách bảo hành và đổi trả hàng hóa</li>
                <li>Chính sách thanh toán</li>
                <li>Chính sách bảo hành Imoo</li>
                <li>Điều kiện & Điều khoản thành viên</li>
              </ul>
            </div>
          </div>
          <div className="col-span-5">
            <span className="text-lg font-bold text-pink-600">
              Hệ thống cửa hàng
            </span>
            <img
              src="https://www.mykingdom.com.vn/cdn/shop/files/1280x496_0f861e00-cc45-4a74-8aea-25669853be6b.png?v=1740760910&width=1200"
              alt="other"
              className="mt-3 max-w-lg rounded-3xl"
            />
          </div>
        </div>
        <div className="container flex items-center gap-10 py-5">
          <div>
            Công ty cổ phần Việt Tinh Anh Số ĐKKD: 0309132354 do sở kế hoạch và
            đầu tư cấp ngày 14/07/09 <br />
            Địa chỉ: 33-35 đường số D4, khu Đô thị mới Him Lam, Phường Tân Hưng,
            Quận 7, TP. Hồ Chí Minh Điện thoại: 0286.2638.600
          </div>
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/0579/0439/8524/files/image_24.svg?v=1682498901"
              alt="confirm"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
