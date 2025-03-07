import React, { useState } from "react";

export default function QuantityInput() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="px-4 flex items-center bg-gray-100 rounded-lg justify-between py-2">
      <button onClick={() => setQuantity(Math.max(quantity-1,1))} className="text-gray-500 text-2xl ">
        –
      </button>

      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        min="1"
        className="bg-transparent font-medium text-lg w-35 text-center"
      />

      <button onClick={() => setQuantity(quantity+1)} className="text-gray-500 text-2xl">
        +
      </button>
    </div>
  );
}