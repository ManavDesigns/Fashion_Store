import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "Shipping Information | The Atelier",
};

export default function ShippingPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shipping" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          Shipping & Delivery
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            The Atelier ships globally using express premier couriers to ensure your garments arrive in pristine condition.
          </p>
          <p>
             All orders placed before 2:00 PM CET will be processed the same day. Domestic shipping takes 1-2 business days, while international deliveries typically require 3-5 business days depending on customs clearance.
          </p>
          <p>
            Complimentary shipping is provided on all orders exceeding our threshold.
          </p>
        </div>
      </div>
    </main>
  );
}
