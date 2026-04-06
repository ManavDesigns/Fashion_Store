import Link from "next/link";

const footerLinks = [
  {
    title: "Customer Care",
    links: [
      { label: "Help", href: "/help" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Pinterest", href: "https://pinterest.com" },
      { label: "Twitter", href: "https://twitter.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-border mt-auto">
      <div className="site-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8 mb-24">
        {/* Branding & Info */}
        <div className="lg:col-span-2">
          <Link 
            href="/" 
            className="text-2xl font-black tracking-tighter uppercase text-primary mb-8 block"
          >
            The Atelier
          </Link>
          <div className="text-secondary text-[11px] font-medium leading-loose uppercase tracking-[0.05em] max-w-sm">
            <p>1422 Atelier St, Paris, France</p>
            <p>Mon - Sat / 10am - 8pm</p>
            <p>atelier@theatelier.com</p>
            <p className="mt-6 italic opacity-60">
              Curating the essence of modern sophistication since 2024.
            </p>
          </div>
        </div>

        {/* Dynamic Links */}
        {footerLinks.map((group) => (
          <div key={group.title} className="flex flex-col gap-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
              {group.title}
            </h3>
            <div className="flex flex-col gap-4">
              {group.links.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="text-[11px] font-bold uppercase tracking-[0.1em] text-secondary hover:text-primary transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Bar */}
      <div className="site-container pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">
        <p>© 2024 The Atelier. All rights reserved.</p>
        <div className="flex gap-12">
           <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
           <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
