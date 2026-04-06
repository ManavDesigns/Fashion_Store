"use client";

import Breadcrumb from "../../components/common/Breadcrumb";
import EmptyState from "../../components/common/EmptyState";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, total, itemCount } = useCart();

  return (
    <main className="section-padding !pt-10 h-full bg-surface">
      <div className="site-container">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Your Bag", href: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <div className="flex flex-col gap-6 mb-16 fade-in">
          <span className="label-eyebrow opacity-40">Secure Checkout</span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-[-0.03em] leading-none text-primary">
            Finalize Order
          </h1>
          <p className="text-secondary text-sm md:text-base font-medium max-w-lg italic opacity-80 mt-2">
            Complete your purchase of {itemCount} curated {itemCount === 1 ? 'piece' : 'pieces'}. Your information is securely encrypted.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center border border-dashed border-border/40 rounded-[32px] bg-white fade-in">
             <EmptyState
               message="Your checkout is awaiting selection. Please add items to your reserved bag."
             />
             <div className="mt-12 flex gap-6">
                <Link href="/products" className="btn btn-primary h-14 px-12">Return to Collection</Link>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 fade-in">
            {/* Multi-step form */}
            <div className="flex flex-col h-fit">
              <CheckoutForm hasItems={items.length > 0} />
            </div>

            {/* Dynamic Order Summary */}
            <div className="h-fit lg:sticky lg:top-28">
              <OrderSummary items={items} subtotal={subtotal} total={total} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
