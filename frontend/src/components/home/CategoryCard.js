import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category }) {
  const name = category.translation?.name || category.name;
  const slug = category.translation?.slug || category.slug;
  const iconUrl = category.logoUrl || category.imageUrl;

  return (
    <Link 
      href={`/categories/${slug}`} 
      className="flex flex-col items-center gap-4 group fade-in"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-surface border border-border/50 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500 ease-out flex items-center justify-center p-4">
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={name}
            width={64}
            height={64}
            className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-10 h-10 bg-border/20 rounded-full group-hover:bg-primary/5 transition-colors" />
        )}
        
        {/* Subtle hover effect */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
      </div>
      
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-secondary group-hover:text-primary transition-colors text-center leading-tight max-w-[100px]">
        {name}
      </span>
    </Link>
  );
}
