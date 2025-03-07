import ProductBox from "../ProductBox/ProductBox";

export default function ListProductSearch(props) {
  const { viewType, products } = props;
  return (
    <div
      className={`grid ${viewType === "grid2x2" ? "grid-cols-2" : "grid-cols-3"} gap-4`}
    >
      {products.map((product) => (
        <ProductBox product={product} key={product.id} />
      ))}
    </div>
  );
}
