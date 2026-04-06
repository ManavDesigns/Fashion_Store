"use client";

import { useState } from "react";
import { formatMoney, getProductDisplayPrice } from "../../lib/utils";
import { Heart, Minus, Plus, ChevronDown } from "lucide-react";
import Button from "../common/Button";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/40 py-6 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-70 transition-all"
      >
        <span>{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="text-secondary text-xs font-medium leading-relaxed italic opacity-80">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Charcoal");

  const price = formatMoney(getProductDisplayPrice(product));

  return (
    <article className="flex flex-col gap-10 lg:pl-10 h-full pt-10 md:pt-0 fade-in">
      {/* Header Info */}
      <div className="flex flex-col gap-4">
        <span className="label-eyebrow text-primary/40">Core Collection — Edition 01</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-primary">
          {product.name}
        </h1>
        <p className="text-2xl md:text-3xl font-bold tracking-tighter text-primary/80">
          {price}
        </p>
      </div>

      <div className="text-secondary text-sm md:text-base font-medium leading-relaxed italic opacity-80 max-w-lg mb-4">
        {product.description || "A definitive study in form and function. This oversized silhouette is crafted from 100% sustainably sourced Italian wool, featuring dropped shoulders and clean-finished seams for a sharp, editorial finish."}
      </div>

      {/* Selectors */}
      <div className="flex flex-col gap-10">
        {/* Colors */}
        <div className="flex flex-col gap-5 text-[10px] font-black uppercase tracking-[0.15em] text-secondary">
          <span>Color — {selectedColor}</span>
          <div className="flex gap-4">
            {["Black", "Charcoal", "Cloud"].map((color) => (
               <button
                 key={color}
                 onClick={() => setSelectedColor(color)}
                 className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                   selectedColor === color ? 'border-primary p-0.5 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                 }`}
               >
                 <div className={`w-full h-full rounded-full ${
                   color === 'Black' ? 'bg-zinc-900' : color === 'Charcoal' ? 'bg-zinc-500' : 'bg-zinc-100'
                 }`} />
               </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-5 text-[10px] font-black uppercase tracking-[0.15em] text-secondary">
          <div className="flex items-center justify-between">
            <span>Size</span>
            <button className="underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity">Size Guide</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["S", "M", "L", "XL"].map((size) => (
               <button
                 key={size}
                 onClick={() => setSelectedSize(size)}
                 className={`h-14 border transition-all duration-300 font-black flex items-center justify-center ${
                   selectedSize === size ? 'bg-primary text-white border-primary shadow-xl shadow-black/10' : 'bg-white border-border hover:border-sidebar-primary text-secondary'
                 }`}
               >
                 {size}
               </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 pt-4">
        <Button className="h-16 text-xs shadow-2xl shadow-black/10 active:scale-[0.98]">
           Add to Cart
        </Button>
        <Button variant="secondary" className="h-16 text-xs gap-3">
          <Heart size={16} strokeWidth={2.5} />
          Add to Wishlist
        </Button>
      </div>

      {/* Accordions */}
      <div className="flex flex-col mt-8">
        <Accordion title="Composition & Materials">
          100% Virgin Wool Shell. Lining: 100% Cupro. Sustainably sourced from family-run mills in Northern Italy.
        </Accordion>
        <Accordion title="Garment Care">
          Professional dry clean only. Store on a wide-shouldered hanger to maintain the architectural form.
        </Accordion>
        <Accordion title="Shipping & Returns">
          Complimentary express shipping on all orders. Returns are accepted within 30 days of delivery.
        </Accordion>
      </div>
    </article>
  );
}
