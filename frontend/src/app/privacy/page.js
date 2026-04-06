import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "Privacy Policy | The Atelier",
};

export default function PrivacyPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          Privacy Policy
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            The Atelier values the privacy and security of our clients. This Privacy Policy sets out how we collect, use, and protect any personal information that you provide to us when you use our website.
          </p>
          <p>
            We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this platform, you can be assured that it will only be used in accordance with this privacy statement.
          </p>
        </div>
      </div>
    </main>
  );
}
