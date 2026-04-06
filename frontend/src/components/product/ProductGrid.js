import EmptyState from "../common/EmptyState";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products matched your selection"
        description="Try a different category, type, or sorting option."
      />
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "18px",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
