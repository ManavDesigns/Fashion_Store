"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mail, ShieldCheck, LogOut } from "lucide-react";
import AccountSidebar from "../../components/account/AccountSidebar";
import OrdersSection from "../../components/account/OrdersSection";
import { customerApi } from "../../lib/bagisto";

// Moved metadata to a separate layout file or removed for client component compatibility

const mockOrders = [
  {
    number: "#AT-89021",
    date: "Oct 12, 2024",
    title: "Sculptural Winter Collection",
    price: "$1,250.00",
    status: "IN TRANSIT",
    action: "TRACK ORDER",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    number: "#AT-88432",
    date: "Sep 28, 2024",
    title: "Footwear & Accessories",
    price: "$450.00",
    status: "DELIVERED",
    action: "REORDER",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    number: "#AT-87001",
    date: "Aug 15, 2024",
    title: "Essential Sportscraft",
    price: "$210.00",
    status: "DELIVERED",
    action: "REORDER",
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400&auto=format&fit=crop"
    ]
  }
];

export default function AccountPage() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await customerApi.logout();
      router.push("/auth");
      router.refresh();
    } catch (error) {
       console.error("Logout failed:", error);
       router.push("/auth");
    }
  }

  return (
    <main className="bg-surface/30 min-h-screen pt-12 pb-24 border-t border-border/40">
      <div className="site-container">
        
        {/* Top Header / Profile Block */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-12 fade-in">
          {/* Profile Card */}
          <div className="bg-white p-8 md:p-10 rounded-[20px] shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-8 border border-border/30">
            <div className="w-32 h-32 bg-black rounded-3xl relative shrink-0 overflow-hidden flex items-center justify-center">
               <span className="text-white font-black text-4xl">ER</span>
               <div className="absolute bottom-2 right-2 bg-black w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                 <span className="text-white text-[8px] rotate-45 border-b-2 border-r-2 border-white w-2 h-2" />
               </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-start justify-center h-full pt-2">
              <h1 className="text-3xl font-black uppercase tracking-tight text-primary">ELENA ROSSI</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60 mt-1 mb-6">
                ELITE MEMBER SINCE 2022
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg text-xs font-bold text-primary">
                  <Mail size={12} className="opacity-60" />
                  e.rossi@atelier.com
                </div>
                <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg text-xs font-bold text-primary">
                  <ShieldCheck size={12} className="opacity-60" />
                  Verified Account
                </div>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="bg-black p-8 md:p-10 rounded-[20px] shadow-sm flex flex-col justify-center border border-black text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 relative z-10">
               Atelier Points
             </span>
             <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-8 relative z-10">
               4,850
             </h2>
             <button className="bg-white text-black h-12 w-full font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors relative z-10">
               Redeem Benefits
             </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 fade-in">
          {/* Custom Sidebar Matching Screenshot 2 */}
          <aside className="w-full shrink-0">
             <nav className="flex flex-col gap-2">
               <a href="#orders" className="flex items-center justify-between p-5 bg-white border border-border shadow-sm rounded-xl font-black text-[10px] uppercase tracking-widest text-primary">
                 <div className="flex items-center gap-4">
                   <div className="w-4 h-4" /> {/* Icon Spacer */}
                   Order History
                 </div>
                 <div className="w-2 h-2 rounded-full bg-black/80" />
               </a>
               <a href="#address" className="flex items-center gap-4 p-5 hover:bg-white hover:border hover:border-border/50 border border-transparent rounded-xl font-bold text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-all">
                 <div className="w-4 h-4 ml-1" />
                 Address Book
               </a>
               <a href="#payment" className="flex items-center gap-4 p-5 hover:bg-white hover:border hover:border-border/50 border border-transparent rounded-xl font-bold text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-all">
                 <div className="w-4 h-4 ml-1" />
                 Payment Methods
               </a>
               <a href="#settings" className="flex items-center gap-4 p-5 hover:bg-white hover:border hover:border-border/50 border border-transparent rounded-xl font-bold text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-all">
                 <div className="w-4 h-4 ml-1" />
                 Settings
               </a>
             </nav>
             <div className="mt-8 pt-8 border-t border-border/40">
               <button
                 onClick={handleLogout}
                 className="flex items-center gap-4 p-5 font-bold text-[10px] uppercase tracking-widest text-[#d32f2f] hover:text-[#b71c1c] transition-all w-full text-left"
               >
                 <LogOut size={16} />
                 Sign Out
               </button>
             </div>
          </aside>

          {/* Orders Section Matching Screenshot 2 */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-border/40 pb-4">
               <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-primary">Recent Orders</h2>
                  <p className="text-xs text-secondary mt-1">Showing last 5 orders</p>
               </div>
               <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:opacity-70 transition-opacity">
                 View All
               </a>
            </div>

            <div className="flex flex-col gap-6">
              {mockOrders.map((order) => (
                <div key={order.number} className="bg-white border border-border shadow-sm rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 group hover:border-black/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
                    
                    {/* Mock multi-image stack */}
                    <div className="relative w-28 h-36">
                      {order.images.length > 1 ? (
                        <>
                          <div className="absolute top-0 left-0 w-24 h-32 bg-surface rounded-xl overflow-hidden border border-white shadow-md z-10 grayscale brightness-75 object-cover">
                              <img src={order.images[0]} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute bottom-0 right-0 w-24 h-32 bg-surface rounded-xl overflow-hidden border border-white shadow-lg z-20 grayscale brightness-75 object-cover">
                              <img src={order.images[1]} className="w-full h-full object-cover" />
                          </div>
                        </>
                      ) : (
                         <div className="absolute inset-0 bg-surface rounded-xl overflow-hidden border border-white shadow-md grayscale brightness-75 object-cover">
                             <img src={order.images[0]} className="w-full h-full object-cover" />
                         </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center h-36 py-2">
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">Order {order.number}</span>
                       <h3 className="text-lg font-bold text-primary mt-1 mb-2">{order.title}</h3>
                       <p className="text-xs text-secondary">Ordered on {order.date}</p>
                       <p className="text-sm font-bold text-primary mt-auto">${order.price.replace('$', '')}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end justify-between h-36 py-2 w-full md:w-auto">
                    <span className="px-4 py-1.5 rounded-full border border-border bg-surface text-[9px] font-black uppercase tracking-widest text-primary">
                      {order.status}
                    </span>
                    <button className="h-12 px-8 border border-border font-black text-[10px] uppercase tracking-widest text-primary hover:bg-black hover:text-white transition-colors w-full md:w-auto mt-6 md:mt-0">
                      {order.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
