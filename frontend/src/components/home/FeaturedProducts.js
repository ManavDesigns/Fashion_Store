import ProductCard from "../product/ProductCard";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

export default function FeaturedProducts({ products = [] }) {
  if (!products?.length) return null;

  // Use up to 8 products for a balanced 4-column grid
  const displayProducts = products.slice(0, 8);

  return (
    <section className="section-padding bg-surface/30 border-t border-border/40">
      <div className="site-container">
        <div className="mb-12">
          <SectionTitle
            eyebrow="The Collection"
            title="Featured Pieces"
            description="Our curated selection of seasonless essentials."
            action={
              <Button href="/products" variant="ghost" className="text-secondary hover:text-primary">
                View All
              </Button>
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
            <Button href="/products" className="bg-white border border-border text-primary hover:border-black transition-colors px-12 h-14">
               Explore Full Collection
            </Button>
        </div>
      </div>
    </section>
  );
}
