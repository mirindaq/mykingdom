import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { path } from "@/constants/path";
import ProductBox, {
  ProductBoxSkeleton,
} from "@/components/ProductBox/ProductBox";
import React, { useEffect, useState } from "react";
import { productApi } from "@/services/product.api";
import { PaginationBox } from "@/components/PaginationBox/PaginationBox";
import { wishlistApi } from "@/services/wishlist.api";
import { useAuth } from "@/hooks/AuthContext";

export default function Exclusive() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productResponse = await productApi.getAllProducts(
          `limit=8&page=${currentPage}`,
        );

        let wishlist = { products: [] };

        if (user?.user) {
          const wishlistResponse = await wishlistApi.getWishlist(user.user);
          wishlist = wishlistResponse || { products: [] };
        }

        const data = productResponse;

        const updatedProducts = data.products.map((product) => ({
          ...product,
          isWishlist: wishlist.products.some(
            (item) => item._id === product._id,
          ),
        }));
        console.log(updatedProducts);

        setProducts(updatedProducts);
        setTotalProducts(data.pagination.total);
        setTotalPage(data.pagination.totalPages);
        setCurrentPage(data.pagination.page);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.exclusive, label: "Độc quyền online" },
  ];

  return (
    <div>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="container mx-auto my-10 gap-6">
        <p className="pb-7 text-center text-5xl font-bold text-blue-900">
          Ưu đãi độc quyền website
        </p>
        <div>
          {loading && (
            <div className="mt-5 grid w-full grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductBoxSkeleton key={index} />
              ))}
            </div>
          )}
          <div className="grid w-full grid-cols-4 gap-4">
            {products?.map((product, index) => (
              <ProductBox key={index} product={product} />
            ))}
          </div>
        </div>
        {totalProducts > 0 && (
          <div className="mt-4">
            <PaginationBox
              totalPage={totalPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
