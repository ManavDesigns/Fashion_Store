import Link from "next/link";
import { User, ShoppingBag, Heart, Search } from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-luxury border-b border-border transition-all duration-500">
      <div className="site-container flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <div className="flex-1">
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-black tracking-tighter uppercase text-primary hover:opacity-70 transition-opacity"
          >
            The Atelier
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <Navbar />
        </div>

        {/* Icons */}
        <div className="flex items-center justify-end gap-1 sm:gap-3 flex-1">
          <button className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all lg:hidden" aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link href="/wishlist" className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/account" className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all" aria-label="Account">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all relative" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full border border-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
