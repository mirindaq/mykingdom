import { Heart } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductBox() {
  return (
    <div className="my-5 w-full rounded-3xl border border-gray-200 p-4 relative">
      <div className="absolute bg-red-600 px-4 py-1 text-white rounded-lg right-5 top-5">-50%</div>
      <div>
        <img
          src="https://www.mykingdom.com.vn/cdn/shop/files/do-choi-may-nuoi-thu-ao-punirunes-6071162_1.jpg?v=1725899471&width=990"
          alt="img"
          className="w-full p-4"
        />
      </div>
      <div className="flex items-center justify-between text-gray-400 pt-2">
        <p>PUNIRUNES</p>
        <p>SKU:607112</p>
      </div>
      <p className="text-blue-800">Đồ Chơi Máy Nuôi Thú Ảo Punirunes 6071162</p>
      <div className="flex items-center justify-between pt-8">
        <p className="text-xl font-semibold text-red-600">1.1890.000 D</p>
        <p className="text-base text-gray-400 line-through">1.1890.000 D</p>
      </div>
      <div className="grid grid-cols-6 gap-3 py-2">
        <Button variant="addToCart" className="col-span-5 w-full py-6">
          Thêm Vào Giỏ Hàng
        </Button>
        <div className="col-span-1 flex items-center justify-center">
          <Heart className="h-9 w-9 text-red-600" />
        </div>
      </div>
    </div>
  );
}
