import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "Help & FAQ | The Atelier",
};

export default function HelpPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Help" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          Help & FAQs
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            Welcome to The Atelier Help Center. We are dedicated to providing support matching the quality of our garments.
          </p>
          <p>
            For immediate assistance regarding sizing, available inventory, or placing a bespoke order, please contact our experts directly. This section will be updated with comprehensive frequently asked questions regarding our platform.
          </p>
        </div>
      </div>
    </main>
  );
}
