import { path } from "@/constants/path";
import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="grid w-3/6 grid-cols-12">
          <img
            src="https://www.thegioididong.com/html/TGDD/destop/images/404.png"
            alt="404"
            className="col-span-7 h-full w-full"
          />
          <div className="col-span-5 flex flex-col items-center justify-center">
            <p className="text-center text-4xl font-semibold tracking-wide text-red-600">
              Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
            </p>
            <Link to={path.homepage}>
              <button
                type="button"
                className="me-2 mt-7 mb-2 cursor-pointer rounded-full bg-red-600 px-5 py-2.5 text-center font-bold text-base text-white"
              >
                Trở về trang chủ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
