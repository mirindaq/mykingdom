import React from "react";


export default function PriceProduct(props) {

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " Đ";
    };

    const formatDiscount = (d) => {
        return "-" + d + "%";
    };

    const {priceType, currentPrice, oldPrice, discount} = props;
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <p className="w-26 text-black">{priceType}</p>
                <div className="flex items-center gap-2 pr-15">
                    <p className="text-red-600 text-2xl font-medium">{formatPrice(currentPrice)}</p>
                    <p className="text-gray-400 text-lg line-through">{formatPrice(oldPrice)}</p>
                </div>
                <span className="bg-red-600 text-white py-1 px-4 rounded-md font-bold text-sm">
                    {formatDiscount(discount)}
                </span>
            </div>
        </>
    );
}
