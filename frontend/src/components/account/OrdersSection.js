import { Package, ArrowUpRight } from "lucide-react";
import Button from "../common/Button";

export default function OrdersSection({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <section id="orders" className="flex flex-col gap-6 py-12 border-t border-border/40 fade-in">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">Order History</h2>
        <div className="flex flex-col items-center justify-center py-16 bg-surface border border-dashed border-border/40 rounded-[32px]">
          <Package className="text-secondary/30 mb-4" size={48} strokeWidth={1} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">No recent orders</p>
          <Button href="/products" variant="ghost" className="mt-4">Explore Collection</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="orders" className="flex flex-col gap-8 py-12 border-t border-border/40 fade-in">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">Order History</h2>
        <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors underline underline-offset-4 hidden sm:block">View All Orders</a>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <article
            key={order.number}
            className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 border border-border rounded-[24px] bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 text-[10px] font-black uppercase tracking-[0.1em] text-secondary">
              <div className="flex flex-col gap-2">
                <span className="opacity-40 tracking-[0.2em]">Order Ref</span>
                <span className="text-primary tracking-tight text-xs">{order.number}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-40 tracking-[0.2em]">Date</span>
                <span className="text-primary">{order.date}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-40 tracking-[0.2em]">Status</span>
                <span className={`w-fit px-3 py-1 rounded-full border ${order.status === 'Processing' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-[#e5ebe7] text-[#166534] border-[#166534]/20'}`}>
                   {order.status}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-40 tracking-[0.2em]">Total</span>
                <span className="text-primary">{order.total}</span>
              </div>
            </div>

            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 self-end md:self-auto shrink-0">
               <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
