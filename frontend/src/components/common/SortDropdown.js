import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

function buildHref(basePath, searchParams, key, value) {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default function SortDropdown({
  basePath,
  searchParams,
  currentValue,
  options = [],
}) {
  const currentOption = options.find((option) => option.value === currentValue);

  return (
    <div className="flex items-center gap-4">
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
        Sort By
      </span>
      <details className="relative group min-w-[200px]">
        <summary className="flex items-center justify-between gap-4 px-4 py-2 border border-border bg-white cursor-pointer list-none font-medium text-[10px] uppercase tracking-widest text-primary hover:border-black transition-colors">
          <span>{currentOption?.label || "Recommended"}</span>
          <ChevronDown size={14} strokeWidth={1.5} className="group-open:rotate-180 transition-transform" />
        </summary>

        <div className="absolute top-full left-0 md:right-0 md:left-auto w-full p-0 bg-white border-x border-b border-border shadow-md z-20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          {options.map((option) => (
            <Link
              key={option.value || "default"}
              href={buildHref(basePath, searchParams, "sort", option.value)}
              className={cn(
                "px-4 py-3 text-[10px] font-medium uppercase tracking-widest transition-all text-left",
                option.value === currentValue 
                  ? "bg-primary text-white" 
                  : "text-primary hover:bg-surface"
              )}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
