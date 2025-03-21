import React from 'react';

export default function NewsBox({ image, title, description, link }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={image} alt={title} className="rounded-lg mb-3" />
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <button className="mt-2 text-red-500 font-medium hover:underline">
        {link ? <a href={link}>Xem chi tiết</a> : "Xem chi tiết"}
      </button>
    </div>
  );
}
export function NewsBoxSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
      {/* Skeleton cho hình ảnh */}
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-3"></div>

      {/* Skeleton cho tiêu đề */}
      <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>

      {/* Skeleton cho mô tả */}
      <div className="w-full h-4 bg-gray-300 rounded mb-1"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded"></div>

      {/* Skeleton cho nút */}
      <div className="w-1/3 h-4 bg-gray-300 rounded mt-2"></div>
    </div>
  );
}
