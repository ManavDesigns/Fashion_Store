import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "About Our Philosophy | The Atelier",
};

export default function AboutPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in border-t border-border/40 bg-surface/30">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          The Philosophy
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            The Atelier was founded in 2024 to bring an entirely new perspective to premium eCommerce. We believe in the curation of architectural silhouettes and premium natural fibers, designed specifically for the modern minimalist. 
          </p>
          <p>
            By stripping away the superfluous, we focus on the raw aesthetic value and unmatched craftsmanship of every individual garment. Our boutique functions as a digital showroom, removing friction and bringing high fashion directly to your screen with unparalleled technical precision.
          </p>
          <p>
            Quality over quantity. Always.
          </p>
        </div>
      </div>
    </main>
  );
}
