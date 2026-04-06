"use client";

import Link from "next/link";
import { User, ShoppingBag, Heart } from "lucide-react";
import Navbar from "./Navbar";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Header() {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;

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
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all relative"
            aria-label="Wishlist"
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black text-white text-[9px] font-black flex items-center justify-center rounded-full">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href="/account"
            className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all"
            aria-label="Account"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-2.5 rounded-full hover:bg-surface text-secondary hover:text-primary transition-all relative"
            aria-label="Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black text-white text-[9px] font-black flex items-center justify-center rounded-full">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden border-t border-border/40 overflow-x-auto">
        <div className="site-container py-3">
          <Navbar />
        </div>
      </div>
    </header>
  );
}
