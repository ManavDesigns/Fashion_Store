"use client";

import Image from "next/image";
import Breadcrumb from "../../components/common/Breadcrumb";
import { formatMoney } from "../../lib/utils";

// Mock Data for exact visual recreation of the screenshot layout
const mockCartItems = [
  {
    id: 1,
    label: "NEW COLLECTION",
    name: "Structured Wool Overcoat",
    price: 1250,
    color: "Camel Heather",
    size: "42 (IT)",
    quantity: 1,
    image: "/home/manav.machhi/.gemini/antigravity/brain/e5ced431-15ac-4cd2-ae49-01f86be7a133/atelier_promo_suiting_1775468036433.png"
  },
  {
    id: 2,
    label: "ESSENTIALS",
    name: "Premium Cotton Mock-Neck",
    price: 185,
    color: "Jet Black",
    size: "Large",
    quantity: 1,
    image: "/home/manav.machhi/.gemini/antigravity/brain/e5ced431-15ac-4cd2-ae49-01f86be7a133/atelier_hero_women_1775467882866.png"
  }
];

export default function CartPage() {
  const subtotal = 1435;
  const taxes = 114.80;
  const total = 1549.80;

  return (
    <main className="bg-surface/30 min-h-screen pt-12 pb-24 border-t border-border/40">
      <div className="site-container">
        
        {/* Header from Screenshot 3 */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-[3rem] font-black uppercase tracking-tighter leading-none text-primary mb-2">
            YOUR BAG
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
            ITEMS ARE RESERVED FOR 30 MINUTES
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
          
          {/* Cart Items List */}
          <div className="flex flex-col">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-8 py-8 border-t border-border/60 group first:border-0 first:pt-0">
                {/* Image */}
                <div className="relative w-full sm:w-[200px] aspect-[4/5] bg-surface overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover grayscale brightness-75"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 pb-2">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60 mb-1">
                        {item.label}
                      </span>
                      <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-primary shrink-0">${formatMoney(item.price).replace('$', '')}</span>
                  </div>

                  <p className="text-xs font-medium text-secondary mt-1">Color: {item.color}</p>
                  <p className="text-xs font-medium text-secondary mt-1">Size: {item.size}</p>

                  <div className="flex justify-between items-end mt-auto pt-6">
                    {/* Quantity */}
                    <div className="flex items-center w-[100px] h-10 border border-border bg-white text-[10px] font-bold">
                       <button className="flex-1 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">−</button>
                       <span className="w-10 text-center">{item.quantity}</span>
                       <button className="flex-1 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">+</button>
                    </div>

                    {/* Remove */}
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 hover:opacity-100 hover:text-black transition-all">
                       <div className="w-3 h-3 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                       </div>
                       REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:sticky lg:top-32 h-fit">
            
            {/* Order Summary */}
            <div className="bg-white p-8 border border-border shadow-sm">
               <h2 className="text-xl font-bold text-primary mb-8">Order Summary</h2>
               
               {/* Promo Code */}
               <div className="flex flex-col gap-3 mb-8">
                 <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">PROMO CODE</label>
                 <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      className="flex-1 border-y border-l border-border h-12 px-4 text-xs font-medium placeholder:text-secondary focus:outline-none"
                    />
                    <button className="h-12 px-6 border border-border bg-white text-[9px] font-black uppercase tracking-widest text-primary hover:border-black transition-colors shrink-0">
                      APPLY
                    </button>
                 </div>
               </div>

               {/* Pricing */}
               <div className="flex flex-col gap-4 text-sm font-medium border-b border-border/60 pb-6 mb-6">
                 <div className="flex justify-between text-secondary">
                   <span>Subtotal</span>
                   <span className="text-primary">${formatMoney(subtotal).replace('$', '')}</span>
                 </div>
                 <div className="flex justify-between text-secondary">
                   <span>Estimated Shipping</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary pt-1">COMPLIMENTARY</span>
                 </div>
                 <div className="flex justify-between text-secondary">
                   <span>Taxes</span>
                   <span className="text-primary">${formatMoney(taxes).replace('$', '')}</span>
                 </div>
               </div>

               {/* Total */}
               <div className="flex justify-between items-center mb-8">
                 <span className="text-[14px] font-black uppercase tracking-widest text-primary">TOTAL</span>
                 <span className="text-2xl font-bold text-primary">${formatMoney(total).replace('$', '')}</span>
               </div>

               {/* Checkout Action */}
               <button className="w-full h-14 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center">
                 PROCEED TO CHECKOUT
               </button>

               {/* Payment Icons Header space */}
               <div className="flex items-center justify-center gap-4 mt-6 opacity-30 text-xs">
                 <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                 <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                 <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
               </div>
            </div>

            {/* Assistance Block */}
            <div className="bg-[#f6f5f3] p-8 border border-border/40 text-center flex flex-col items-center">
               <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">NEED ASSISTANCE?</h3>
               <p className="text-[11px] text-secondary leading-relaxed max-w-[240px] mb-6">
                 Our atelier experts are available to assist you with sizing, styling, and order inquiries.
               </p>
               <button className="text-[9px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:opacity-60 transition-opacity">
                 CONTACT BOUTIQUE SERVICE
               </button>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
