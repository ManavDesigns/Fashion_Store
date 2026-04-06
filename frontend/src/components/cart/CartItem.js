"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { formatMoney, resolveBagistoAssetUrl } from "../../lib/utils";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const imageUrl = resolveBagistoAssetUrl(item.product?.baseImageUrl || item.baseImageUrl);
  const name = item.product?.name || item.name;
  const price = formatMoney(item.price || 0);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-8 py-10 border-b border-border/40 fade-in group">
      {/* Product Image */}
      <div className="relative w-full sm:w-32 aspect-[3/4] bg-surface rounded-2xl overflow-hidden border border-border/30 shadow-sm transition-all duration-700 ease-out group-hover:shadow-md">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-secondary opacity-30 italic text-[9px] uppercase font-black">
            Visual pending
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="label-eyebrow text-secondary/50">Item Detail</span>
            <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-primary leading-tight hover:opacity-70 transition-opacity decoration-primary underline-offset-4 cursor-pointer">
              {name}
            </h3>
          </div>
          <p className="text-sm md:text-base font-bold text-primary tracking-tighter">{price}</p>
        </div>

        {/* Variants Selection */}
        <div className="flex gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-secondary opacity-60 mt-2">
           <span>Size: {item.size || "M"}</span>
           <span>Color: {item.color || "Obsidian"}</span>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center border border-border rounded-none overflow-hidden h-10 w-fit bg-white">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
              className="px-3 hover:bg-surface transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} strokeWidth={3} />
            </button>
            <span className="w-10 text-center text-xs font-black uppercase tracking-widest border-x border-border h-full flex items-center justify-center">
              {item.quantity || 1}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
              className="px-3 hover:bg-surface transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-error transition-all group/remove"
            aria-label="Remove item"
          >
            <X size={14} className="group-hover/remove:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Delete Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}
