import React, { useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";

export default function Login() {
  const { login } = useAuth();
  const [user, setUser] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(user);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* Điều chỉnh chiều rộng form */}
      <div className="w-[480px] rounded-lg bg-white p-10 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold">Đăng Nhập</h2>
        <form onSubmit={onSubmit}>
          {/* Ô nhập email */}
          <div className="mb-5">
            <label className="mb-2 block text-lg font-semibold text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              className="w-full rounded-lg border px-5 py-3 text-lg focus:border-red-500 focus:outline-none"
              placeholder="Nhập email của bạn"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {/* Ô nhập mật khẩu */}
          <div className="mb-5">
            <label className="mb-2 block text-lg font-semibold text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full rounded-lg border px-5 py-3 text-lg focus:border-red-500 focus:outline-none"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            Đăng Nhập
          </button>
          {/* Liên kết quên mật khẩu / tạo tài khoản */}
          <p className="mt-5 text-center text-base text-gray-600">
            <a href="#" className="font-medium text-red-500">
              Quên mật khẩu?
            </a>{" "}
            |{" "}
            <Link to={path.register} className="font-medium text-red-500">
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
