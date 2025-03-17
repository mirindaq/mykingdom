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
