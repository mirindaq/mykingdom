import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function ProductBox(props) {
  const { product } = props;
  return (
    <Link
      to={`/collections/${product.slug}`}
      className="relative my-5 flex w-full flex-col justify-between rounded-3xl border border-gray-200 p-4 transition-all duration-200 hover:cursor-pointer hover:border-0 hover:shadow-2xl"
    >
      {product.discount > 0 && (
        <div className="absolute top-5 right-5 rounded-lg bg-red-600 px-4 py-1 text-white">
          {product.discount} %
        </div>
      )}
      <div className="w-full">
        <img
          src={product.image_url[0]}
          alt={product.name}
          className="w-full p-4"
        />
      </div>

      <div>
        <div className="flex items-center justify-between pt-2 text-gray-400">
          <p>{product.brand}</p>
          <p>SKU: {product.id}</p>
        </div>
        <p className="text-blue-800">{product.name}</p>
      </div>

      <div>
        {" "}
        <div className="flex items-center justify-between pt-8">
          <p className="text-xl font-semibold text-red-600">
            {(product.price * (1 - product.discount / 100)).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              },
            )}
          </p>
          <p className="text-base text-gray-400 line-through">
            {product.discount > 0
              ? product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : ""}
          </p>
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
    </Link>
  );
}
