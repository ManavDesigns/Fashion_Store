"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveBagistoAssetUrl } from "../../lib/utils";

export default function ProductGallery({ product }) {
  const images = product?.images?.edges 
    ? product.images.edges.map((edge) => edge.node) 
    : [];
  
  // If no gallery images, use the base image
  const galleryImages = images.length > 0 
    ? images 
    : product.baseImageUrl 
      ? [{ url: resolveBagistoAssetUrl(product.baseImageUrl), id: "base" }] 
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  if (!galleryImages.length) {
    return (
      <div className="aspect-[3/4] bg-surface flex items-center justify-center rounded-[32px] border border-border/40">
        <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-30 italic">
          Visual Pending
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 lg:gap-10 fade-in">
      {/* Thumbnails Sidebar */}
      <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 md:py-0 md:max-h-[600px] lg:max-h-[800px]">
        {galleryImages.map((image, index) => (
          <button
            key={image.id || index}
            onClick={() => setActiveIndex(index)}
            className={`relative flex-shrink-0 w-20 h-24 md:w-24 md:h-32 rounded-xl overflow-hidden border-2 transition-all duration-500 ease-out ${
              activeIndex === index 
                ? "border-primary opacity-100 scale-105" 
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={resolveBagistoAssetUrl(image.url || image.path)}
              alt={`${product.name} gallery ${index + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image */}
      <div className="flex-1 relative aspect-[3/4] bg-surface rounded-[40px] overflow-hidden border border-border/40 shadow-sm shadow-black/5 group cursor-zoom-in">
        <Image
          src={resolveBagistoAssetUrl(
            galleryImages[activeIndex]?.url || galleryImages[activeIndex]?.path
          )}
          alt={product.name}
          fill
          priority
          unoptimized
          className="object-cover transition-transform duration-[2s] ease-out hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Subtle Decorative Badge */}
        <div className="absolute top-8 left-8">
           <span className="label-eyebrow text-white/40 mix-blend-difference">
             Atelier Archive 01
           </span>
        </div>
      </div>
    </div>
  );
}
