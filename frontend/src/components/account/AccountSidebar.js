"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Heart, ShoppingBag, LogOut } from "lucide-react";
import { customerApi } from "../../lib/bagisto";

const links = [
  { href: "#profile", label: "Profile", icon: User },
  { href: "#orders", label: "Order History", icon: Package },
  { href: "#addresses", label: "Addresses", icon: MapPin },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/cart", label: "Your Bag", icon: ShoppingBag },
];

export default function AccountSidebar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await customerApi.logout();
      router.push("/auth");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/auth");
    }
  }

  return (
    <aside className="sticky top-28 flex flex-col gap-8 fade-in">
      <div className="flex flex-col gap-2 border-b border-border/40 pb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-50">Account</span>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-primary">Dashboard</h2>
      </div>

      <nav className="flex flex-col gap-2 text-sm font-bold tracking-tight">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-4 p-4 rounded-xl text-secondary hover:text-primary hover:bg-surface transition-all group"
          >
            <link.icon size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="uppercase tracking-widest text-[10px]">{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-border/40 pt-6 mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-4 rounded-xl text-error/80 hover:text-error hover:bg-error/5 transition-all w-full group"
        >
          <LogOut size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="uppercase tracking-widest text-[10px] font-bold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
