"use client";

import { useState } from "react";
import { formatMoney, getProductDisplayPrice } from "../../lib/utils";
import { Heart, Check, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/40 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-70 transition-all"
      >
        <span>{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-secondary text-xs font-medium leading-relaxed italic opacity-80">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails({ product }) {
  const { addItem: addToCart } = useCart();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [addedToCart, setAddedToCart] = useState(false);

  const price = formatMoney(getProductDisplayPrice(product));

  const itemId = product?.id || product?.urlKey || String(product?._id);
  const isWishlisted = wishlistItems.some(
    (item) => item.id === itemId || String(item.productId) === String(product?._id || product?.id)
  );

  async function handleAddToCart() {
    await addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  function handleToggleWishlist() {
    if (isWishlisted) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist({ ...product, id: itemId });
    }
  }

  return (
    <article className="flex flex-col gap-10 lg:pl-10 h-full pt-10 md:pt-0 fade-in">
      {/* Header Info */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary opacity-50">
          {product?.type || "Collection"} — The Atelier
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] text-primary">
          {product?.name}
        </h1>
        <p className="text-2xl font-bold tracking-tighter text-primary/80">{price}</p>
      </div>

      <p className="text-secondary text-sm font-medium leading-relaxed italic opacity-80 max-w-lg">
        {product?.shortDescription ||
          product?.description ||
          "A definitive study in form and function. Crafted from sustainably sourced materials, featuring clean-finished seams for a sharp, editorial finish."}
      </p>

      {/* Selectors */}
      <div className="flex flex-col gap-8">
        {/* Color */}
        <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-secondary">
          <span>Color — {selectedColor}</span>
          <div className="flex gap-3">
            {["Black", "Charcoal", "Cloud"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                aria-label={color}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                  selectedColor === color
                    ? "border-primary scale-110 shadow-md"
                    : "border-transparent hover:scale-105"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    color === "Black" ? "bg-zinc-900" : color === "Charcoal" ? "bg-zinc-500" : "bg-zinc-100 border border-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-secondary">
          <div className="flex items-center justify-between">
            <span>Size — {selectedSize}</span>
            <button className="underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-12 border transition-all duration-200 font-black text-[10px] flex items-center justify-center ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white border-border hover:border-black text-secondary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Actions */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full h-14 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
            addedToCart
              ? "bg-zinc-800 text-white"
              : "bg-black text-white hover:bg-zinc-800 active:scale-[0.98]"
          }`}
        >
          {addedToCart ? (
            <>
              <Check size={15} strokeWidth={2.5} />
              Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag size={15} strokeWidth={1.5} />
              Add to Bag
            </>
          )}
        </button>

        {/* Wishlist */}
        <button
          onClick={handleToggleWishlist}
          className={`w-full h-14 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest border transition-all duration-300 ${
            isWishlisted
              ? "border-black bg-black text-white"
              : "border-border bg-white text-primary hover:border-black"
          }`}
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={isWishlisted ? "fill-white text-white" : ""}
          />
          {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
        </button>
      </div>

      {/* Accordions */}
      <div className="flex flex-col mt-4">
        <Accordion title="Composition & Materials">
          100% Virgin Wool Shell. Lining: 100% Cupro. Sustainably sourced from family-run mills in Northern Italy. Each garment carries a certificate of authenticity.
        </Accordion>
        <Accordion title="Garment Care">
          Professional dry clean only. Store on a wide-shouldered hanger to maintain the architectural form. Do not tumble dry or iron directly.
        </Accordion>
        <Accordion title="Shipping & Returns">
          Complimentary express shipping on all orders. Returns are accepted within 14 days of delivery in original condition with all tags attached.
        </Accordion>
      </div>
    </article>
  );
}
