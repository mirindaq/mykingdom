import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/CartContext";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { wishlistApi } from "@/services/wishlist.api";
import { useAuth } from "@/hooks/AuthContext";
import { useEffect, useState } from "react";

export default function ProductBox(props) {
  const [isWishlist, setIsWishlist] = useState(false);
  const { product } = props;
  const { addToCart } = useCart();
  const { user } = useAuth();
  useEffect(() => {
    if (product?.isWishlist) {
      setIsWishlist(true);
    }
  }, [product?.isWishlist]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleAddToWishlist = async () => {
    if (!user?.user) {
      toast.error("Vui lòng đăng nhập để thêm vào danh sách yêu thích");
      return;
    }

    const result = await wishlistApi.addToWishlist(user.user, product._id);
    if (result) {
      setIsWishlist(true);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!user?.user) {
      toast.error("Vui lòng đăng nhập để xóa khỏi danh sách yêu thích");
      return;
    }
    const result = await wishlistApi.removeFromWishlist(user.user, product._id);
    if (result) {
      setIsWishlist(false);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    }
  };

  return (
    <div className="relative my-5 flex w-full flex-col justify-between rounded-3xl border border-gray-200 p-4 transition-all duration-200 hover:cursor-pointer hover:border-0 hover:shadow-2xl">
      <Link to={`/collections/${product.slug}`}>
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
            <p>{product.brand.name}</p>
            <p>{product.origin}</p>
          </div>
          <p className="text-blue-800">{product.name}</p>
        </div>
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
      </Link>

      <div>
        {" "}
        <div className="grid grid-cols-6 gap-3 py-2">
          <Button
            variant="addToCart"
            className="col-span-5 w-full py-6"
            onClick={handleAddToCart}
          >
            Thêm Vào Giỏ Hàng
          </Button>
          <div className="col-span-1 flex items-center justify-center">
            <div
              onClick={
                isWishlist ? handleRemoveFromWishlist : handleAddToWishlist
              }
              className="cursor-pointer"
            >
              {isWishlist ? (
                <Heart className="h-9 w-9 fill-red-600 text-red-600 transition-all duration-300" />
              ) : (
                <Heart className="h-9 w-9 text-red-600 transition-all duration-300" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductBoxSkeleton() {
  return (
    <div className="relative my-5 flex w-full flex-col justify-between rounded-3xl border border-gray-200 p-4">
      <div className="w-full">
        <Skeleton className="aspect-square w-full rounded-xl p-4" />
      </div>

      <div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="mt-2 h-5 w-[80%]" />
      </div>

      <div className="flex items-center justify-between pt-8">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-6 gap-3 py-2">
        <Skeleton className="col-span-5 h-[52px] w-full rounded-lg" />
        <Skeleton className="col-span-1 h-[52px] w-full rounded-lg" />
      </div>
    </div>
  );
}
