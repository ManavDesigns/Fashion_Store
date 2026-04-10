"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mail, ShieldCheck, LogOut, Package, MapPin, Heart, ShoppingBag, User as UserIcon } from "lucide-react";
import AccountSidebar from "../../components/account/AccountSidebar";
import OrdersSection from "../../components/account/OrdersSection";
import ProfileSection from "../../components/account/ProfileSection";
import AddressSection from "../../components/account/AddressSection";
import { customerApi } from "../../lib/bagisto";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAccountData() {
      try {
        setLoading(true);
        const data = await customerApi.getProfile();
        // Handle both single object and array responses from ApiPlatform
        const profile = Array.isArray(data) ? data[0] : data;
        setCustomer(profile);
        setError(null);
      } catch (err) {
        console.error("Account fetch failed:", err);
        setError("Failed to load account data. Please try signing in again.");
        // If it's a 401/403 or rate limit, we might want to redirect
        if (err.message?.includes("401") || err.message?.includes("unauthenticated")) {
           router.push("/auth");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAccountData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await customerApi.logout();
      router.push("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary opacity-60">Loading your Atelier account...</p>
        </div>
      );
    }

    if (error && !customer) {
      return (
        <div className="bg-surface p-10 border border-border flex flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium text-secondary">{error}</p>
          <button 
            onClick={() => router.push("/auth")}
            className="h-12 px-8 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "profile":
        return <ProfileSection profile={customer} />;
      case "orders":
        return <OrdersSection />;
      case "addresses":
        return <AddressSection />;
      default:
        return <ProfileSection profile={customer} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-20 md:h-28"></div>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pb-24">
        {/* Breadcrumbs / Title */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4">Account Dashboard</h1>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary opacity-60">
            <span>Home</span>
            <span>/</span>
            <span className="text-primary">Dashboard</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          {/* Sidebar */}
          <aside className="flex flex-col gap-2">
            {[
              { id: "profile", label: "Profile", icon: UserIcon },
              { id: "orders", label: "Orders", icon: Package },
              { id: "addresses", label: "Addresses", icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 h-14 border transition-all ${
                  activeTab === tab.id 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-secondary border-border hover:border-primary hover:text-primary"
                }`}
              >
                <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 1.5} />
                <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-6 h-14 border border-border text-secondary hover:border-red-500 hover:text-red-500 transition-all mt-6"
            >
              <LogOut size={18} strokeWidth={1.5} />
              <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="min-h-[600px]">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
