import Image from "next/image";
import { resolveBagistoAssetUrl } from "../../lib/utils";

export default function CategoryBanner({ category, productCount }) {
  const imageUrl = resolveBagistoAssetUrl(category.bannerUrl);
  const name = category.translation?.name || category.name;
  const description = category.translation?.description || category.description;

  return (
    <div className="flex flex-col gap-10 mb-16 fade-in">
      {/* Visual Header */}
      {imageUrl && (
        <div className="relative w-full aspect-[21/9] md:aspect-[32/10] bg-surface rounded-[40px] overflow-hidden border border-border/40 shadow-sm transition-all duration-700">
           <Image
             src={imageUrl}
             alt={name}
             fill
             priority
             unoptimized
             className="object-cover transition-transform duration-1000 hover:scale-105"
           />
           <div className="absolute inset-0 bg-black/5" />
        </div>
      )}

      {/* Text Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-5xl">
        <div className="flex flex-col gap-4">
          <span className="label-eyebrow opacity-60">Category</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[-0.03em] leading-none text-primary">
            {name}
          </h1>
          {description && (
             <p className="text-secondary text-sm md:text-base font-medium max-w-2xl leading-relaxed mt-2 opacity-80 italic">
               {description}
             </p>
          )}
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-40">
            Availability
          </span>
          <p className="text-sm font-black uppercase tracking-tight text-primary">
            {productCount} {productCount === 1 ? 'Piece' : 'Pieces'}
          </p>
        </div>
      </div>
    </div>
  );
}
