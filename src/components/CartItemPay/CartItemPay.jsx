import React from 'react'

export default function CartItemPay(props) {
  const { item } = props;

  return (
    <div>
      <li
        key={item.id}
        className="flex items-center justify-between border-b pt-4 pb-3"
      >
        <img
          src={item.image_url[0]}
          alt={item.name}
          className="h-20 w-20 rounded object-cover mr-10"
        />
        <div className="ml-3 flex flex-1 flex-col">
          <span className="text-md font-medium">{item.name}</span>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-md">Số lượng: {item.quantity}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-red-600">
            {item.discount
              ? `${((item.price - (item.discount * item.price) / 100) * item.quantity).toLocaleString()}đ`
              : `${(item.price * item.quantity).toLocaleString()}đ`}
          </span>

        </div>
      </li>
    </div>
  )
}
