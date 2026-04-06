"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatMoney, resolveBagistoAssetUrl } from "../../lib/utils";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  async function handleMoveToCart(item) {
    await addToCart({ ...item, quantity: 1 });
    removeItem(item.id);
  }

  return (
    <main className="bg-surface/30 min-h-screen pt-12 pb-24 border-t border-border/40 fade-in">
      <div className="site-container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />

        {/* Header */}
        <div className="flex items-end justify-between mt-6 mb-12 border-b border-border/40 pb-8">
          <div>
            <h1 className="text-4xl md:text-[3rem] font-black uppercase tracking-[-0.03em] leading-none text-primary">
              Saved Items
            </h1>
            <p className="text-xs font-medium text-secondary mt-2">
              {items.length} {items.length === 1 ? "piece" : "pieces"} saved
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center gap-8 text-center">
            <div className="w-20 h-20 border border-border flex items-center justify-center">
              <Heart size={32} strokeWidth={1} className="text-secondary opacity-40" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-2">Your wishlist is empty</h2>
              <p className="text-sm font-medium text-secondary max-w-xs mx-auto leading-relaxed opacity-80">
                Save pieces you love by clicking the heart icon on any product.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((item) => {
              const imageUrl = resolveBagistoAssetUrl(item.image || item.baseImageUrl);
              const price = formatMoney(Number(item.price || 0));
              const href = item.urlKey ? `/products/${item.urlKey}` : "#";

              return (
                <article key={item.id} className="group flex flex-col gap-4">
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                    <Link href={href} className="block w-full h-full">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-secondary opacity-30">
                          No Image
                        </div>
                      )}
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={13} strokeWidth={1.5} className="text-primary" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-secondary opacity-60">
                      {item.type || "Collection"}
                    </span>
                    <Link href={href}>
                      <h3 className="text-xs font-bold text-primary hover:opacity-70 transition-opacity line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] font-medium text-secondary">{price}</p>
                  </div>

                  {/* Move to Cart */}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full h-10 border border-border bg-white text-[9px] font-black uppercase tracking-widest text-primary flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                  >
                    <ShoppingBag size={12} strokeWidth={1.5} />
                    Move to Bag
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
