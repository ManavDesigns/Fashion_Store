"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({
  defaultValue = "",
  action = "/search",
  placeholder = "Search our atelier...",
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      action={action}
      method="GET"
      className="relative flex items-center w-full group overflow-hidden"
    >
      <div className={`absolute left-0 text-secondary transition-all duration-500 ease-in-out pointer-events-none ${isFocused ? 'scale-90 opacity-60' : 'scale-100 opacity-100'}`}>
        <Search size={18} strokeWidth={1.5} />
      </div>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="Search products"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full h-10 pl-8 pr-12 bg-transparent border-b border-border focus:border-primary transition-all duration-700 outline-none text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] placeholder:text-secondary/30 placeholder:normal-case placeholder:tracking-normal placeholder:font-medium italic"
      />
      {isFocused && (
        <button 
          type="reset" 
          className="absolute right-0 p-2 text-secondary hover:text-primary transition-colors animate-in fade-in zoom-in-75 duration-300"
          onClick={() => setIsFocused(false)}
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </form>
  );
}
