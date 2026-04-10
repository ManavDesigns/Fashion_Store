"use client";

import { useState } from "react";
import Image from "next/image";
import Breadcrumb from "../../components/common/Breadcrumb";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <main className="section-padding !pt-10 h-full bg-surface min-h-[85vh]">
      <div className="site-container">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account access" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 mt-8 md:mt-16 bg-white overflow-hidden rounded-[40px] border border-border shadow-xl shadow-black/5 fade-in">
          {/* Form Side */}
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
             <div className="flex flex-col gap-2 mb-12">
               <span className="label-eyebrow text-secondary/50">Access Atelier</span>
               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-primary">
                 {activeTab === "login" ? "Sign In" : "Create Account"}
               </h1>
             </div>

             {/* Tab Toggle */}
             <div className="flex gap-8 mb-12 border-b border-border/40">
                <button 
                  onClick={() => setActiveTab("login")}
                  className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'login' ? 'text-primary' : 'text-secondary/50 hover:text-primary/70'}`}
                >
                  Login
                  {activeTab === "login" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />}
                </button>
                <button 
                  onClick={() => setActiveTab("register")}
                  className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'register' ? 'text-primary' : 'text-secondary/50 hover:text-primary/70'}`}
                >
                  Register
                  {activeTab === "register" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />}
                </button>
             </div>

             <div className="relative min-h-[400px]">
               {activeTab === "login" ? (
                  <div className="animate-in slide-in-from-left-4 fade-in duration-500">
                    <LoginForm />
                  </div>
               ) : (
                  <div className="animate-in slide-in-from-right-4 fade-in duration-500">
                    <RegisterForm />
                  </div>
               )}
             </div>
          </div>

           {/* Visual Side */}
           <div className="hidden lg:block relative bg-surface border-l border-border/40">
              <Image
                src="/images/auth/hero.png"
                alt="The Atelier Access"
                fill
                priority
                className="object-cover object-center grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-16">
                 <p className="text-white text-sm font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm drop-shadow-md">
                   "An account grants you early access to archive collections and personalized curation."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
