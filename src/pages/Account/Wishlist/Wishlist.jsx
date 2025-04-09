import React, { useState, useEffect } from "react";
import ProductBox from "@/components/ProductBox/ProductBox";
import { PaginationBox } from "@/components/PaginationBox/PaginationBox";
import { wishlistApi } from "@/services/wishlist.api";
import { useAuth } from "@/hooks/AuthContext";

export default function Wishlist() {
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      const response = await wishlistApi.getWishlist(user.user);
      response.products = response.products.map((product) => ({
        ...product,
        isWishlist: true,
      }));
      setFavoriteProducts(response.products);
      setIsLoading(false);
    };

    fetchWishlist();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = favoriteProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(favoriteProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-start text-2xl font-bold">
        Danh sách sản phẩm yêu thích
      </h1>
      {isLoading ? (
        <div className="mt-30 flex items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : favoriteProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <ProductBox key={product._id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <PaginationBox
                currentPage={currentPage}
                totalPage={totalPages}
                onPageChange={paginate}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Danh sách yêu thích của bạn đang trống.
        </p>
      )}
    </div>
  );
}
