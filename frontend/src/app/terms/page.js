import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "Terms of Service | The Atelier",
};

export default function TermsPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          Terms of Service
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            Welcome to The Atelier. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.
          </p>
          <p>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
          </p>
        </div>
      </div>
    </main>
  );
}
