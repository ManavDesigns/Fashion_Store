import Image from "next/image";
import Link from "next/link";
import {
  formatMoney,
  getProductDisplayPrice,
  resolveBagistoAssetUrl,
} from "../../lib/utils";

export default function ProductCard({ product }) {
  const price = formatMoney(getProductDisplayPrice(product));
  const href = product?.urlKey ? `/products/${product.urlKey}` : "/";
  const imageUrl = resolveBagistoAssetUrl(product.baseImageUrl);

  return (
    <article className="group flex flex-col gap-4 fade-in">
      {/* Image Wrapper */}
      <Link 
        href={href} 
        className="relative aspect-[3/4] bg-surface overflow-hidden transition-all duration-700 ease-in-out"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-secondary opacity-20 italic text-[10px] uppercase font-black tracking-widest bg-gray-100">
            No visual
          </div>
        )}
      </Link>

      {/* Info Section */}
      <div className="flex flex-col gap-1 items-start text-left">
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-secondary opacity-60">
          {product.type || "Outerwear"}
        </span>
        <Link href={href} className="inline-block mt-1">
          <h3 className="text-xs font-bold text-primary group-hover:opacity-70 transition-opacity line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] font-medium text-secondary">{price}</p>
      </div>
    </article>
  );
}
