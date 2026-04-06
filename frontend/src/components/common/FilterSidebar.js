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
  // Hardcoded for demo purposes as per screenshot structure
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["bg-black", "bg-gray-200", "bg-gray-800", "bg-white border border-gray-200", "bg-gray-400"];

  return (
    <aside className="w-full xl:pr-10 sticky top-28">
      <div className="space-y-12">
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

        {/* Dummy Size Selector (Matching Screenshot) */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => (
              <button
                key={s}
                className={cn(
                  "flex items-center justify-center w-12 h-10 border border-border text-[10px] font-bold transition-all",
                  i === 1 ? "bg-black text-white border-black" : "bg-white text-primary hover:border-black"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Dummy Color Palette */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            Color Palette
          </h3>
          <div className="flex gap-3">
            {colors.map((c, i) => (
              <button
                key={i}
                className={cn(
                  "w-6 h-6 rounded-full",
                  c,
                  i === 0 ? "ring-1 ring-offset-2 ring-black" : ""
                )}
              />
            ))}
          </div>
        </section>

        {/* Dummy Price Range */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            Price Range
          </h3>
          <div className="relative pt-4 pb-2">
            <div className="h-[2px] w-full bg-border relative">
               <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-black" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-[9px] font-medium text-primary">
            <span>$100</span>
            <span>$2,500</span>
          </div>
        </section>
      </div>
    </aside>
  );
}
