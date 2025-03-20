import { path } from "@/constants/path";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const data = {
  "Quảng Ninh": {
    "Thành phố Uông Bí": [
      "Phường Quang Trung",
      "Phường Thanh Sơn",
      "Phường Yên Thanh",
    ],
    "Thành phố Hạ Long": [
      "Phường Bãi Cháy",
      "Phường Hồng Hà",
      "Phường Hồng Hải",
    ],
  },
  "Hà Nội": {
    "Quận Ba Đình": ["Phường Điện Biên", "Phường Kim Mã", "Phường Ngọc Hà"],
    "Quận Hoàn Kiếm": [
      "Phường Hàng Bài",
      "Phường Hàng Gai",
      "Phường Hàng Trống",
    ],
  },
};

export default function FormAddress() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const provinces = Object.keys(data);
  const districts = selectedProvince ? Object.keys(data[selectedProvince]) : [];
  const wards = selectedDistrict
    ? data[selectedProvince][selectedDistrict]
    : [];

  return (
    <div>
      <form action="">
        <div>
          <select
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("");
              setSelectedWard("");
            }}
          >
            <option value="">Tỉnh / TP</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 grid grid-cols-10 gap-4">
          <div className="col-span-5">
            <select
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedWard("");
              }}
              disabled={!selectedProvince}
            >
              <option value="">Quận / Huyện</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-5">
            <select
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!selectedDistrict}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward} value={ward}>
                  {ward}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
              placeholder="Họ và tên"
            />
          </div>
        </div>

        <div className="mt-4">
          <input
            type="text"
            id="first_name"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Số nhà, tên đường"
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            id="first_name"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Điện thoại"
          />
        </div>
        <div className="mt-8 flex items-center justify-between border-b-1 border-b-gray-300 pb-20">
              <Link to={path.cart} className="text-green-600">&#60; Quay lại giỏ hàng</Link>
              <Link>
                <button className="rounded-lg bg-red-600 px-10 py-4 text-white hover:cursor-pointer">
                  Xác nhận thanh toán
                </button>
              </Link>
            </div>
      </form>
    </div>
  );
}
