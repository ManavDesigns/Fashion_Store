import SectionTitle from "../common/SectionTitle";
import ProductCard from "../product/ProductCard";
import Button from "../common/Button";

export default function NewArrivals({ products = [] }) {
  if (!products?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-surface/50 border-y border-border/50">
      <div className="site-container">
        <SectionTitle
          eyebrow="Just Landed"
          title="New Arrivals"
          description="Fresh silhouettes and seasonal essentials for your everyday wardrobe."
          action={
            <Button href="/products" variant="ghost">
              Shop New Arrivals
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
