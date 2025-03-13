import React from "react";

export default function PriceProduct(props) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " Đ";
  };

  const formatDiscount = (d) => {
    return "-" + d + "%";
  };

  const { priceType, price, discount } = props;
  if (discount > 0)
    return (
      <>
        <div className="mb-4 flex items-center justify-between">
          <p className="w-26 text-black">{priceType}</p>
          <div className="flex items-center gap-2 pr-15">
            <p className="text-2xl font-medium text-red-600">
              {formatPrice((price * (100 - discount)) / 100)}
            </p>
            <p className="text-lg text-gray-400 line-through">
              {formatPrice(price)}
            </p>
          </div>
          <span className="rounded-md bg-red-600 px-4 py-1 text-sm font-bold text-white">
            {formatDiscount(discount)}
          </span>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="mb-4 flex items-center justify-between">
          <p className="w-26 text-black">{priceType}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-medium text-red-600">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </>
    );
}
