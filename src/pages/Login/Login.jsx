import React from "react";

export default function Login() {
  return (
    <div>
      <div class="flex justify-center items-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 class="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
            <form>
                <div class="mb-4">
                    <label class="block text-gray-700">E-mail</label>
                    <Input type="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Mật khẩu</label>
                    <Input type="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"/>
                </div>
                <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">Đăng Nhập</button>
                <p class="text-center text-sm text-gray-600 mt-4">
                    <a href="#" class="text-red-500">Quên mật khẩu?</a> | <a href="#" class="text-red-500">Tạo tài khoản</a>
                </p>
            </form>
        </div>
    </div>
    </div>
  );
}
