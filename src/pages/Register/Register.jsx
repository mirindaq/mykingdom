import React, { useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { path } from "@/constants/path";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({});
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setPasswordError("Mật khẩu không khớp");
      return;
    }

    if (!user.name || !user.email || !user.password || !user.phone) {
      return;
    }

    await register(user);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };

      if (
        updatedUser.password &&
        updatedUser.confirmPassword &&
        updatedUser.password !== updatedUser.confirmPassword
      ) {
        setPasswordError("Mật khẩu không khớp");
      } else {
        setPasswordError("");
      }

      return updatedUser;
    });
  };

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.register, label: "Đăng ký" },
  ];

  return (
    <div>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-[500px] rounded-lg bg-white p-10 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-blue-900">
            Tạo Tài Khoản
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-500"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Điện thoại *
              </label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-500"
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
              <p className="mt-1 text-sm text-red-500">
                Số điện thoại này được sử dụng để nhận OTP khi đổi điểm tích
                lũy.
              </p>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                E-mail *
              </label>
              <input
                type="email"
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-500"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="relative mb-4 grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block font-medium text-gray-700">
                  Mật khẩu *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full rounded-lg border px-4 py-2 focus:border-blue-500"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute top-9 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁
                </button>
              </div>

              <div className="relative">
                <label className="block font-medium text-gray-700">
                  Nhập lại mật khẩu *
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full rounded-lg border px-4 py-2 focus:border-blue-500"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute top-9 right-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  👁
                </button>
              </div>

              {passwordError && (
                <p className="col-span-2 text-sm text-red-500">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="mb-4 flex items-center">
              <input type="checkbox" className="mr-2" />
              <p className="text-sm">
                Tôi đã đọc và đồng ý{" "}
                <a href="#" className="text-blue-500">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="#" className="text-blue-500">
                  Chính sách thành viên
                </a>
                .
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 py-3 text-lg font-bold text-white hover:bg-red-700"
            >
              Tạo tài khoản
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Bạn đã có tài khoản?{" "}
              <Link to={path.login} className="text-blue-500">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
