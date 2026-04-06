import ProductCard from "../product/ProductCard";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

export default function FeaturedProducts({ products = [] }) {
  if (!products?.length) return null;

  // Design-specific placement: 1 large on left, 2 smaller on right
  const mainProduct = products[0];
  const sideProducts = products.slice(1, 4);

  return (
    <section className="section-padding bg-white">
      <div className="site-container">
        <SectionTitle
          eyebrow="The Collection"
          title="Featured Pieces"
          description="A study in modern elegance and architectural form."
          action={
            <Button href="/products" variant="ghost" className="text-secondary hover:text-primary">
              View All
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          {/* Main Large Product */}
          <div className="lg:pr-10">
            <ProductCard product={mainProduct} large />
          </div>

          {/* Secondary Products Column */}
          <div className="flex flex-col gap-16">
            {sideProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
