import ProductCard from "../product/ProductCard";
import EmptyState from "../common/EmptyState";

export default function CategoryProductGrid({ products = [] }) {
  if (!products?.length) {
    return <EmptyState message="No products currently available in this collection." />;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  );
}
