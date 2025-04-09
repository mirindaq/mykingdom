import { PaginationBox } from "@/components/PaginationBox/PaginationBox";
import ProductBox, {
  ProductBoxSkeleton,
} from "@/components/ProductBox/ProductBox";
import { Button } from "@/components/ui/button";
import { path } from "@/constants/path";
import { useAuth } from "@/hooks/AuthContext";
import { productApi } from "@/services/product.api";
import { wishlistApi } from "@/services/wishlist.api";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
  });
  const { user } = useAuth();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let wishlist = { products: [] };

      if (user?.user) {
        const wishlistResponse = await wishlistApi.getWishlist(user.user);
        wishlist = wishlistResponse || { products: [] };
      }

      const data = await productApi.searchProductsByName({
        name: keyword,
        page: pagination.page,
        limit: 8,
      });
      console.log(data);
      const updatedProducts = data.products.map((product) => ({
        ...product,
        isWishlist: wishlist?.products?.some(
          (item) => item._id === product._id,
        ),
      }));

      setListProduct(updatedProducts);
      setPagination({
        totalPages: data.pagination.totalPages,
        page: data.pagination.page,
      });
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams, user]);

  return (
    <div className="container mx-auto my-10 gap-6">
      <div className="py-8 text-center text-4xl">
        {keyword != "" ? (
          <>Kết quả tìm kiếm cho "{keyword}"</>
        ) : (
          <>Tất cả sản phẩm</>
        )}
      </div>
      <div>
        {isLoading ? (
          <>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductBoxSkeleton key={index} />
              ))}
            </div>
          </>
        ) : listProduct.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {listProduct.map((item) => (
                <ProductBox key={item._id} product={item} />
              ))}
            </div>
            <div className="mt-5">
              <PaginationBox
                totalPage={pagination.totalPages || 0}
                currentPage={pagination.page || 1}
                onPageChange={(page) => {
                  setPagination({
                    totalPages: pagination.totalPages,
                    page: page,
                  });
                  setSearchParams({ ...searchParams, page: page, limit: 8 });
                }}
              />
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img src="/images/emptyCart.png" className="h-100 w-100" />
            </div>
            <p className="mt-2 text-lg">
              Chúng tôi không tìm thấy sản phẩm theo từ khóa của bạn. Hãy thử
              tìm kiếm lại với từ khóa khác.
            </p>
            <div className="mt-5 flex items-center justify-center">
              <Link to={path.collections}>
                <Button variant="more">Xem tất cả sản phẩm</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
