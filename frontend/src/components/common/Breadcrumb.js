import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 p-0 m-0 list-none text-secondary text-[10px] font-bold uppercase tracking-widest">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary transition-colors uppercase tracking-[0.1em]">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-primary opacity-100" : "opacity-60"}>
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <span aria-hidden="true" className="opacity-30">
                  <ChevronRight size={10} strokeWidth={3} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
