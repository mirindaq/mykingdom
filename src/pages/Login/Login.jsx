import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Điều chỉnh chiều rộng form */}
      <div className="bg-white p-10 rounded-lg shadow-xl w-[480px]">
        <h2 className="text-3xl font-bold text-center mb-6">Đăng Nhập</h2>
        <form>
          {/* Ô nhập email */}
          <div className="mb-5">
            <label className="block text-gray-700 text-lg font-semibold mb-2">E-mail</label>
            <input 
              type="email" 
              className="w-full px-5 py-3 text-lg border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Nhập email của bạn"
            />
          </div>
          {/* Ô nhập mật khẩu */}
          <div className="mb-5">
            <label className="block text-gray-700 text-lg font-semibold mb-2">Mật khẩu</label>
            <input 
              type="password" 
              className="w-full px-5 py-3 text-lg border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Nhập mật khẩu"
            />
          </div>
          {/* Nút đăng nhập */}
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-3 text-lg font-semibold rounded-lg hover:bg-red-700 transition">
            Đăng Nhập
          </button>
          {/* Liên kết quên mật khẩu / tạo tài khoản */}
          <p className="text-center text-base text-gray-600 mt-5">
            <a href="#" className="text-red-500 font-medium">Quên mật khẩu?</a> | <a href="#" className="text-red-500 font-medium">Tạo tài khoản</a>
          </p>
        </form>
      </div>
    </div>
  );
}
