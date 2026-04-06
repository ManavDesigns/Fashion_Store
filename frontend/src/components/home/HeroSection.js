import Image from "next/image";
import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center bg-[#F4F4F4] overflow-hidden">
      <div className="site-container grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20 lg:py-0 relative z-10">
        <div className="flex flex-col items-start max-w-2xl fade-in">
          <span className="label-eyebrow mb-8 text-primary/40">Summer Collection</span>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase leading-[0.85] mb-12 tracking-[-0.05em] text-primary">
            Women's <br /> Essence
          </h1>
          <p className="text-secondary text-base md:text-lg mb-14 font-medium leading-relaxed max-w-sm italic opacity-80">
            A study in minimalist silhouettes and organic textures. Designed for the modern woman who values craft over trend.
          </p>
          <Button href="/categories/women" variant="primary" className="px-16 h-14">
            Shop All
          </Button>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="absolute top-0 right-0 w-full h-full lg:w-[55%] pointer-events-none">
        <Image
          src="/home/manav.machhi/.gemini/antigravity/brain/e5ced431-15ac-4cd2-ae49-01f86be7a133/atelier_hero_women_1775467882866.png"
          alt="Women's Essence Hero"
          fill
          priority
          unoptimized
          className="object-cover object-center lg:object-left grayscale-[0.2] transition-transform duration-[3s] ease-out scale-110 lg:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F4] via-transparent to-transparent lg:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F4F4]/50 via-transparent to-transparent lg:hidden block" />
      </div>
    </section>
  );
}
