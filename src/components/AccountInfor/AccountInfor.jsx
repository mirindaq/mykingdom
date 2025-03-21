import React from "react";
import BirthRegister from "@/components/BirthRegister/BirthRegister";
import img from "../../../public/images/FB_6.png";
import { useAuth } from "@/hooks/AuthContext";

export default function AccountInfor(props) {
  return (
    <div>
      <div className="flex gap-4 py-8 flex-col justify-around rounded-2xl border">
        <p className="ms-5 text-xl font-bold text-blue-900">
          Thông tin tài khoản
        </p>
        <div className="ms-5 text-base">
          <p className="font-light text-gray-400">Họ và tên</p>
          <p className="font-medium">{props.user.name}</p>
        </div>
        <div className="ms-5 text-base">
          <p className="font-light text-gray-400">Điện thoại</p>
          <p className="font-medium">{props.user.phone}</p>
        </div>
        <div className="ms-5 text-base">
          <p className="font-light text-gray-400">Email</p>
          <p className="font-medium">{props.user.email}</p>
        </div>
      </div>
      <div className="ms-15 w-2/3">
        <BirthRegister></BirthRegister>
      </div>
      <div>
        <img src={img} alt="" className="mt-10 w-4/5 rounded-2xl" />
      </div>
    </div>
  );
}
