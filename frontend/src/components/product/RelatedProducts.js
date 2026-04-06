import ProductCard from "./ProductCard";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

export default function RelatedProducts({ products = [] }) {
  if (!products?.length) return null;

  return (
    <section className="section-padding bg-white border-t border-border/40 mt-12 md:mt-24">
      <SectionTitle
        eyebrow="Recommended for you"
        title="Wardrobe Essentials"
        description="Curated pieces to complement your architectural collection."
        action={
          <Button href="/products" variant="ghost">
            View All
          </Button>
        }
      />

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </section>
  );
}
