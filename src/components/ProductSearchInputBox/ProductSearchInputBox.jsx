import React from "react";
import { Link } from "react-router-dom";

export default function ProductSearchInputBox(props) {
  const { product } = props;
  return (
    <div className="max-h-[300px] overflow-y-auto border-gray-300 bg-white py-2 shadow-lg hover:cursor-pointer hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Link to={`/collections/${product.slug}`}>
        <div className="py-2">
          <div className="flex items-center justify-start gap-4 px-4 py-2">
            <div>
              <img
                src={product.image_url[0]}
                alt={product.name}
                className="h-20 w-20"
              />
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {product.origin}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {product.discount > 0 ? (
                  <>
                    <span className="text-lg font-semibold text-red-600">
                      {(
                        product.price *
                        (1 - product.discount / 100)
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>

                    <span className="ml-3 text-base text-gray-400 line-through">
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </>
                ) : (
                  <p className="text-lg font-semibold text-red-600">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
