"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/kids", label: "Kids" },
  { href: "/about", label: "About" },
];

const productLinks = [
  { href: "/products", label: "All Products" },
  { href: "/men", label: "Men's Collection" },
  { href: "/women", label: "Women's Collection" },
  { href: "/kids", label: "Kids' Collection" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-8 lg:gap-10">
      
      {/* Products dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-200 ${
            isActive("/products") || isActive("/men") || isActive("/women") || isActive("/kids")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          Products
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown panel */}
        {open && (
          <div
            className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-white shadow-2xl border border-border"
            style={{ zIndex: 9999 }}
          >
            {/* Small arrow */}
            <div
              className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-l border-t border-border rotate-45"
              style={{ zIndex: 9999 }}
            />
            <ul className="py-2">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${
                      pathname === item.href
                        ? "bg-surface text-primary"
                        : "text-secondary hover:bg-surface hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Static nav links */}
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-200 group ${
            isActive(link.href) ? "text-primary" : "text-secondary hover:text-primary"
          }`}
        >
          {link.label}
          <span
            className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-primary transition-all duration-300 ease-out ${
              isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
