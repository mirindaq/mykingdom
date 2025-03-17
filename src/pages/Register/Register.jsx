import React, { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Tạo Tài Khoản</h2>
        <form>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Tên đệm *</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Họ *</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Điện thoại *</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" />
            <p className="text-sm text-red-500 mt-1">Số điện thoại này được sử dụng để nhận OTP khi đổi điểm tích lũy.</p>
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Giới tính *</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:border-blue-500">
              <option value="">Chọn</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">E-mail *</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          
          <div className="mb-4 flex gap-4">
            <div className="relative w-1/2">
              <label className="block text-gray-700 font-medium">Mật khẩu *</label>
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500"
              />
              <button 
                type="button" 
                className="absolute right-3 top-9"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>
            <div className="relative w-1/2">
              <label className="block text-gray-700 font-medium">Nhập lại mật khẩu *</label>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500"
              />
              <button 
                type="button" 
                className="absolute right-3 top-9"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                👁
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm">
              Tôi đã đọc và đồng ý <a href="#" className="text-blue-500">Điều khoản sử dụng</a> và <a href="#" className="text-blue-500">Chính sách thành viên</a>.
            </p>
          </div>

          
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 text-lg font-bold">
            Tạo nên
          </button>

          
          <div className="mt-4 flex items-center">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm">Đăng ký nhận bản tin của chúng tôi?</p>
          </div>

          
          <p className="text-center text-sm text-gray-600 mt-4">
            Bạn đã có tài khoản? <a href="#" className="text-blue-500">Đăng nhập</a>
          </p>
        </form>
      </div>
    </div>
  );
}
