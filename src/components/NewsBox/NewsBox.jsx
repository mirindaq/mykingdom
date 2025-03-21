import React from "react";
import { Link } from "react-router-dom";

export default function NewsBox({ image, title, description, link }) {
  return (
    <div className="max-h-[470px] overflow-hidden rounded-lg bg-white p-4 shadow-md border">
      <img
        src={image}
        alt={title}
        className="mb-3 h-[250px] w-full rounded-lg object-cover"
      />
      <div className="space-y-1">
        <h4 className="line-clamp-1 text-lg font-semibold">{title}</h4>
        <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
      </div>
      <div className="mt-2">
        <Link
          to={link || "#"}
          className="font-medium text-red-500 hover:underline py-2"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export function NewsBoxSkeleton() {
  return (
    <div className="max-h-[400px] animate-pulse rounded-lg bg-white p-4 shadow-md">
      <div className="mb-3 h-[200px] w-full rounded-lg bg-gray-300"></div>
      <div className="space-y-2">
        <div className="mb-2 h-5 w-3/4 rounded bg-gray-300"></div>
        <div className="mb-1 h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>
      </div>
      <div className="mt-2 h-4 w-1/3 rounded bg-gray-300"></div>
    </div>
  );
}
