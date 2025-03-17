import React, { useState } from 'react';
import FavoriteProduct from '@/components/FavoriteProduct/FavoriteProduct';
import { data } from '@/database/data';

export default function Wishlist() {
  const [favoriteProducts, setFavoriteProducts] = useState(data.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const handleRemove = (productId) => {
    const updatedProducts = favoriteProducts.filter((product) => product.id !== productId);
    setFavoriteProducts(updatedProducts);
    console.log(`Đã xóa sản phẩm với id: ${productId}`);
    if (updatedProducts.length <= (currentPage - 1) * productsPerPage && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = favoriteProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(favoriteProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Danh sách sản phẩm yêu thích</h1>
      {favoriteProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-6">
            {currentProducts.map((product) => (
              <FavoriteProduct
                key={product.id}
                product={product}
                onRemove={handleRemove}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                Tiếp
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Danh sách yêu thích của bạn đang trống.</p>
      )}
    </div>
  );
}