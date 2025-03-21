import React from 'react'

export default function CartItemPay(props) {
  const { item } = props;

  return (
    <div>
      <li
        key={item.product._id}
        className="flex items-center justify-between border-b pt-4 pb-3"
      >
        <img
          src={item.product.image_url[0]}
          alt={item.product.name}
          className="h-20 w-20 rounded object-cover mr-10"
        />
        <div className="ml-3 flex flex-1 flex-col">
          <span className="text-md font-medium">{item.product.name}</span>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-md">Số lượng: {item.quantity}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-red-600">
            {item.product.discount
              ? `${((item.product.price - (item.product.discount * item.product.price) / 100) * item.quantity).toLocaleString()}đ`
              : `${(item.product.price * item.quantity).toLocaleString()}đ`}
          </span>

        </div>
      </li>
    </div>
  )
}
