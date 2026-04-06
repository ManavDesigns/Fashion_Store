import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "Returns & Exchanges | The Atelier",
};

export default function ReturnsPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Returns" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          Returns & Exchanges
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            If you are not entirely satisfied with your purchase, we offer a complimentary return service within 14 days of delivery.
          </p>
          <p>
             Items must be returned in their original condition, unused, unwashed, and with all Atelier tags intact. Footwear must be returned in its original, undamaged box.
          </p>
          <p>
            To initiate a return or exchange, please log into your account dashboard or contact our customer care team.
          </p>
        </div>
      </div>
    </main>
  );
}
