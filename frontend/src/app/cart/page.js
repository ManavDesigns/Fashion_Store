"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useCart } from "../../context/CartContext";
import { formatMoney, resolveBagistoAssetUrl } from "../../lib/utils";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const shipping = 0; // Complimentary
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="bg-surface/30 min-h-screen pt-12 pb-24 border-t border-border/40 fade-in">
      <div className="site-container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Your Bag" }]} />

        {/* Header */}
        <div className="mt-6 mb-12">
          <h1 className="text-4xl md:text-[3rem] font-black uppercase tracking-[-0.03em] leading-none text-primary mb-2">
            Your Bag
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
            {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "item" : "items"} reserved` : "Your bag is empty"}
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center gap-8 text-center">
            <div className="w-20 h-20 border border-border flex items-center justify-center">
              <ShoppingBag size={32} strokeWidth={1} className="text-secondary opacity-40" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-2">Your bag is empty</h2>
              <p className="text-sm font-medium text-secondary max-w-xs mx-auto leading-relaxed opacity-80">
                Add pieces you love by clicking "Add to Bag" on any product.
              </p>
            </div>
            <Link
              href="/"
              className="h-12 px-10 bg-black text-white text-[10px] font-black uppercase tracking-widest flex items-center hover:bg-zinc-800 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
            
            {/* Cart Items */}
            <div className="flex flex-col">
              {items.map((item) => {
                const imageUrl = resolveBagistoAssetUrl(item.image || item.baseImageUrl);
                const itemHref = item.urlKey ? `/products/${item.urlKey}` : "#";

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-6 py-8 border-t border-border/60 first:border-0 first:pt-0"
                  >
                    {/* Image */}
                    <Link href={itemHref} className="relative w-full sm:w-[140px] aspect-[3/4] bg-surface overflow-hidden shrink-0">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={item.name} fill unoptimized className="object-cover grayscale-[0.2]" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[9px] font-black uppercase tracking-widest text-secondary opacity-30">
                          No Image
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
                            {item.type || "Collection"}
                          </span>
                          <Link href={itemHref}>
                            <h3 className="text-sm font-bold text-primary mt-1 hover:opacity-70 transition-opacity">
                              {item.name}
                            </h3>
                          </Link>
                        </div>
                        <span className="text-sm font-bold text-primary shrink-0">
                          {formatMoney(Number(item.price) * item.quantity)}
                        </span>
                      </div>

                      <p className="text-[11px] font-medium text-secondary mt-1">
                        {formatMoney(Number(item.price))} each
                      </p>

                      {/* Quantity + Remove */}
                      <div className="flex justify-between items-end mt-auto pt-6">
                        <div className="flex items-center h-10 w-[110px] border border-border bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex-1 flex items-center justify-center text-lg font-bold text-secondary hover:text-primary transition-colors"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex-1 flex items-center justify-center text-lg font-bold text-secondary hover:text-primary transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-secondary hover:text-black transition-colors"
                        >
                          <Trash2 size={12} strokeWidth={1.5} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Cart */}
              <div className="pt-6 border-t border-border/60 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-6 w-full lg:sticky lg:top-32 h-fit">
              <div className="bg-white p-8 border border-border shadow-sm">
                <h2 className="text-base font-bold text-primary mb-8">Order Summary</h2>

                {/* Promo Code */}
                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
                    Promo Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border-y border-l border-border h-11 px-4 text-xs font-medium placeholder:text-secondary focus:outline-none"
                    />
                    <button className="h-11 px-5 border border-border bg-white text-[9px] font-black uppercase tracking-widest text-primary hover:border-black transition-colors shrink-0">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex flex-col gap-4 text-sm font-medium border-b border-border/60 pb-6 mb-6">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span className="text-primary font-bold">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Shipping</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary pt-1">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Estimated Tax</span>
                    <span className="text-primary font-bold">{formatMoney(tax)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[12px] font-black uppercase tracking-widest text-primary">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatMoney(total)}</span>
                </div>

                {/* Checkout */}
                <Link
                  href="/checkout"
                  className="w-full h-14 bg-black text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-zinc-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Assistance */}
              <div className="bg-[#f6f5f3] p-8 border border-border/40 text-center">
                <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">
                  Need Assistance?
                </h3>
                <p className="text-[11px] text-secondary leading-relaxed max-w-[240px] mx-auto mb-5">
                  Our atelier experts are available Mon–Sat, 10AM–8PM CET.
                </p>
                <Link
                  href="/contact"
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:opacity-60 transition-opacity"
                >
                  Contact Boutique Service
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
