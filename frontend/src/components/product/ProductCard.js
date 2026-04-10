"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import {
  formatMoney,
  getProductDisplayPrice,
  resolveBagistoAssetUrl,
} from "../../lib/utils";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product, priority = false }) {
  const { addItem: addToCart } = useCart();
  const {
    items: wishlistItems,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();

  const [addedToCart, setAddedToCart] = useState(false);

  const price = formatMoney(getProductDisplayPrice(product));
  const href = product?.urlKey ? `/products/${product.urlKey}` : "/";
  const imageUrl = resolveBagistoAssetUrl(product.baseImageUrl);

  const itemId = String(product.id || product._id || product.urlKey || "");
  const isWishlisted = wishlistItems.some(
    (item) =>
      item.id === itemId ||
      String(item.productId) === String(product._id || product.id)
  );

  async function handleAddToCart() {
    await addToCart({ ...product, quantity: 1 });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleToggleWishlist() {
    if (isWishlisted) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist({ ...product, id: itemId });
    }
  }

  return (
    <article className="group flex flex-col fade-in">
      {/* ── Image ── */}
      <div className="relative aspect-[3/4] bg-surface overflow-hidden mb-4">
        <Link href={href} className="relative block w-full h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              priority={priority}
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-secondary opacity-20">
              No Image
            </div>
          )}
        </Link>

        {/* Wishlist heart — top-right corner */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
          style={{ zIndex: 10 }}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={
              isWishlisted ? "fill-black text-black" : "text-primary"
            }
          />
        </button>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-1 mb-3">
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-secondary opacity-60">
          {product.type || "Collection"}
        </span>
        <Link href={href}>
          <h3 className="text-xs font-bold text-primary hover:opacity-70 transition-opacity line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] font-medium text-secondary">{price}</p>
      </div>

      {/* ── Add to Bag — always visible, never hidden behind overlay ── */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`w-full h-9 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest border transition-all duration-300 mt-auto ${
          addedToCart
            ? "bg-black text-white border-black"
            : "bg-white text-primary border-border hover:bg-black hover:text-white hover:border-black"
        }`}
      >
        {addedToCart ? (
          <>
            <Check size={11} strokeWidth={2.5} />
            Added
          </>
        ) : (
          <>
            <ShoppingBag size={11} strokeWidth={1.5} />
            Add to Bag
          </>
        )}
      </button>
    </article>
  );
}
