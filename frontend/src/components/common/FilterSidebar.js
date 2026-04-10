"use client";

import Link from "next/link";
import { cn } from "../../lib/utils";

function buildHref(basePath, searchParams, key, value) {
  const params = new URLSearchParams(searchParams || {});
  if (!value) {
    params.delete(key);
  } else if (params.get(key) === value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default function FilterSidebar({ basePath, searchParams, groups = [] }) {
  const sizes = [
    { label: "S", value: "6" },
    { label: "M", value: "7" },
    { label: "L", value: "8" },
    { label: "XL", value: "9" },
    { label: "XXL", value: "10" }
  ];
  
  const colors = [
    { class: "bg-black", value: "4" },
    { class: "bg-white border border-gray-200", value: "5" },
    { class: "bg-gray-400", value: "46" },
    { class: "bg-red-500", value: "1" },
    { class: "bg-blue-500", value: "41" }
  ];

  const currentSize = new URLSearchParams(searchParams || {}).get("size");
  const currentColor = new URLSearchParams(searchParams || {}).get("color");
  const currentPrice = new URLSearchParams(searchParams || {}).get("price");
  const hasFilters = Object.keys(searchParams || {}).length > 0;

  return (
    <aside className="w-full xl:pr-10 sticky top-28">
      <div className="space-y-12">
        {/* Reset Filters Option */}
        {hasFilters && (
          <div className="pb-4 border-b border-border/50">
            <Link
              href={basePath}
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#EF4444] hover:opacity-70 transition-opacity"
            >
              Reset Filters ✕
            </Link>
          </div>
        )}

        {/* Category List */}
        {groups.map((group) => (
          group.options?.length > 0 && (
            <section key={group.key}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
                Category
              </h3>
              <div className="grid gap-3">
                {group.options.map((option) => {
                  const active = new URLSearchParams(searchParams || {}).get(group.key) === option.value;
                  return (
                    <Link
                      key={`${group.key}-${option.value}`}
                      href={buildHref(basePath, searchParams, group.key, option.value)}
                      className="flex items-center justify-between text-xs font-medium text-primary hover:opacity-60 transition-opacity"
                    >
                      <span className={active ? "font-bold" : ""}>{option.label}</span>
                      <span className="text-[10px] text-secondary opacity-60">
                        {option.count < 10 ? `0${option.count}` : option.count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )
        ))}

        {/* Size Selector */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const isActive = currentSize === s.value;
              return (
                <Link
                  key={s.label}
                  href={buildHref(basePath, searchParams, "size", s.value)}
                  className={cn(
                    "flex items-center justify-center w-12 h-10 border border-border text-[10px] font-bold transition-all",
                    isActive ? "bg-black text-white border-black" : "bg-white text-primary hover:border-black"
                  )}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            Color Palette
          </h3>
          <div className="flex gap-3">
            {colors.map((c, i) => {
              const isActive = currentColor === c.value;
              return (
                <Link
                  key={i}
                  href={buildHref(basePath, searchParams, "color", c.value)}
                  className={cn(
                    "block w-6 h-6 rounded-full transition-transform",
                    c.class,
                    isActive ? "ring-2 ring-offset-2 ring-black scale-110" : "hover:scale-110"
                  )}
                />
              );
            })}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            Price Range
          </h3>
          <div className="grid gap-3">
            {[
              { label: "Under $50", value: "0-50" },
              { label: "$50 - $100", value: "50-100" },
              { label: "$100 - $200", value: "100-200" },
              { label: "Over $200", value: "200-10000" }
            ].map((range) => {
              const isActive = currentPrice === range.value;
              return (
                <Link
                  key={range.value}
                  href={buildHref(basePath, searchParams, "price", range.value)}
                  className="flex items-center text-xs font-medium text-primary hover:opacity-60 transition-opacity"
                >
                  <span className={cn("w-3 h-3 border rounded-sm mr-2 flex items-center justify-center", isActive ? "bg-black border-black" : "border-gray-300")}>
                     {isActive && <div className="w-1.5 h-1.5 bg-white rounded-[1px]" />}
                  </span>
                  <span className={isActive ? "font-bold" : ""}>{range.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
