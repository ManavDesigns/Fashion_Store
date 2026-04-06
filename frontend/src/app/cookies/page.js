import Breadcrumb from "../../components/common/Breadcrumb";

export const metadata = {
  title: "Cookie Policy | The Atelier",
};

export default function CookiesPage() {
  return (
    <main className="section-padding !pt-10 min-h-[70vh] fade-in">
      <div className="site-container max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-primary mt-12 mb-8">
          Cookie Policy
        </h1>
        <div className="text-sm font-medium text-secondary leading-relaxed space-y-6">
          <p>
            A cookie is a small file which asks permission to be placed on your computers hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site.
          </p>
          <p>
            We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page traffic and improve our website in order to tailor it to customer needs. 
          </p>
        </div>
      </div>
    </main>
  );
}
