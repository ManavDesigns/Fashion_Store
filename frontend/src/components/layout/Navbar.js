import Link from "next/link";

const links = [
  { href: "/categories/men", label: "Men" },
  { href: "/categories/women", label: "Women" },
  { href: "/categories/accessories", label: "Accessories" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-10">
      {links.map((link) => (
        <Link 
          key={link.label} 
          href={link.href}
          className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all duration-300 relative group"
        >
          {link.label}
          <span className="absolute -bottom-1.5 left-1/2 w-0 h-[1.5px] bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
        </Link>
      ))}
    </nav>
  );
}
