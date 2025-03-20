export default function QuantityInput(props) {
  const { quantity, setQuantity } = props;
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2">
      <button
        onClick={() => setQuantity(Math.max(quantity - 1, 1))}
        className="text-2xl text-gray-500"
      >
        –
      </button>

      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        min="1"
        className="w-35 bg-transparent text-center text-lg font-medium"
      />

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="text-2xl text-gray-500"
      >
        +
      </button>
    </div>
  );
}
