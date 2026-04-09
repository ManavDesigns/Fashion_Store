import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="site-container my-12 md:my-24">
      <div className="relative aspect-[16/9] md:aspect-[21/9] bg-surface rounded-[40px] overflow-hidden group border border-border/50 shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop"
          alt="Summer Suiting Series"
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.1]"
        />
        
        {/* Editorial Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
          <div className="max-w-2xl text-white fade-in">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 block drop-shadow-sm">
              Limited Edition
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] mb-6 md:mb-10 tracking-tighter drop-shadow-md">
              Summer Suiting <br className="hidden md:block" /> Series
            </h2>
            <div className="flex items-center gap-8 md:gap-16">
               <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] opacity-80 leading-relaxed max-w-xs hidden sm:block">
                 The complete artisanal series <br /> now available exclusively online.
               </p>
               <Link 
                href="/categories/new-arrivals" 
                className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-white pb-1 hover:opacity-70 transition-opacity whitespace-nowrap"
               >
                 Explore Series
               </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
