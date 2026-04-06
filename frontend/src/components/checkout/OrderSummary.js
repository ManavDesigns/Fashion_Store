"use client";

import Image from "next/image";
import Button from "../common/Button";
import { formatMoney, resolveBagistoAssetUrl } from "../../lib/utils";

export default function OrderSummary({
  items = [],
  subtotal = 0,
  total = 0,
  shippingLabel = "Calculated at next step",
}) {
  return (
    <aside className="p-8 md:p-12 border border-border rounded-[40px] bg-white shadow-xl shadow-black/5">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-primary border-b border-border/40 pb-6 mb-8">
        Order Summary
      </h2>

      <div className="flex flex-col gap-6 mb-10 overflow-y-auto max-h-[400px] pr-2 no-scrollbar">
        {items.map((item) => {
          const imageUrl = resolveBagistoAssetUrl(item.image || item.product?.baseImageUrl || item.baseImageUrl);

          return (
            <div key={item.id} className="flex gap-6 pb-6 border-b border-border/20 last:border-0 last:pb-0">
              <div className="relative w-20 aspect-[3/4] bg-surface rounded-xl overflow-hidden border border-border/30">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-secondary opacity-30 italic text-[8px] uppercase font-black">
                    No visual
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 py-1">
                <p className="text-sm font-black uppercase tracking-tight text-primary leading-tight hover:opacity-70 line-clamp-2">
                  {item.name}
                </p>
                <div className="mt-auto flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-xs font-bold text-primary tracking-tighter">
                    {formatMoney(item.price)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-5 border-t border-border/40 pt-8 mb-10">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
          <span>Subtotal</span>
          <span className="text-primary opacity-100">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
          <span>Shipping</span>
          <span className="text-primary opacity-100 italic">{shippingLabel}</span>
        </div>
        <div className="flex justify-between items-end pt-4">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Total</span>
          <span className="text-3xl font-black uppercase tracking-tighter text-primary leading-none">
            {formatMoney(total)}
          </span>
        </div>
      </div>

      <Button href="/cart" variant="ghost" className="w-full justify-center">
        Return to Bag
      </Button>
    </aside>
  );
}
