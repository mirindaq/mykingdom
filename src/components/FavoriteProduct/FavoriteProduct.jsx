import React from 'react';

export default function FavoriteProduct({ product, onRemove }) {
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-row items-center w-full max-w-3xl mx-auto border border-gray-200">
      <img
        src={product.image_url[0]}
        alt={product.name}
        className="w-40 h-40 object-cover p-2"
      />
      <div className="p-4 flex flex-col justify-center flex-grow max-w-[calc(100%-15rem)]">
        <h3 className="text-md font-medium text-gray-800 line-clamp-2">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          {product.discount > 0 && (
            <p className="text-sm text-gray-500 line-through">
              {product.price.toLocaleString('vi-VN')} ₫
            </p>
          )}
          <p className="text-md font-semibold text-red-600">
            {discountedPrice.toLocaleString('vi-VN')} ₫
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center gap-2 flex-shrink-0">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
          onClick={() => alert(`Đã thêm ${product.name} vào giỏ hàng!`)}
        >
          Mua
        </button>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors text-sm"
          onClick={() => onRemove(product.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}