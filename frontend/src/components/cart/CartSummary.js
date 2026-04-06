"use client";

import { formatMoney } from "../../lib/utils";
import Button from "../common/Button";

export default function CartSummary({ subtotal, total, itemCount, onClear }) {
  const isFreeShipping = subtotal > 500;

  return (
    <aside className="p-8 md:p-12 border border-border rounded-[40px] bg-white shadow-xl shadow-black/5 sticky top-28 fade-in h-fit">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-primary mb-10 border-b border-border/40 pb-6">
        Order Summary
      </h2>

      <div className="flex flex-col gap-6 mb-12">
        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-secondary">
          <span>Subtotal <span className="opacity-40 italic">({itemCount} items)</span></span>
          <span className="text-primary opacity-100">{formatMoney(subtotal || 0)}</span>
        </div>

        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-secondary">
          <span>Shipping</span>
          <span className={isFreeShipping ? "text-primary opacity-100 italic" : "text-primary opacity-100"}>
            {isFreeShipping ? "Complimentary" : formatMoney(25)}
          </span>
        </div>

        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-secondary border-b border-border/40 pb-6">
          <span>Tax (Est.)</span>
          <span className="text-primary opacity-100">{formatMoney((subtotal || 0) * 0.08)}</span>
        </div>

        <div className="flex justify-between items-end pt-4">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Total</span>
          <span className="text-3xl font-black uppercase tracking-tighter text-primary leading-none">
            {formatMoney(total || 0)}
          </span>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col gap-4">
        <Button 
          href="/checkout" 
          variant="primary" 
          className="h-16 text-[11px] shadow-2xl shadow-black/10 hover:shadow-black/20"
        >
          Check out now
        </Button>
        
        <div className="flex flex-col gap-8 mt-12 pt-12 border-t border-border/40">
           <div className="flex flex-col gap-4">
             <label className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary opacity-60">Promo Code</label>
             <div className="flex gap-2 group">
               <input 
                 type="text" 
                 placeholder="CODE" 
                 className="flex-1 h-12 bg-surface px-6 border-b border-border focus:border-primary transition-all outline-none font-black text-[10px] uppercase tracking-[0.2em]"
               />
               <button className="text-[10px] font-black uppercase tracking-[0.2em] px-4 hover:opacity-60 transition-opacity whitespace-nowrap italic">Apply</button>
             </div>
           </div>

           <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-secondary/40 leading-relaxed italic text-center">
             By proceeding to checkout, you agree to our <br /> <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
           </p>
        </div>
      </div>
    </aside>
  );
}
