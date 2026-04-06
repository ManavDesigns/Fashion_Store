import Link from "next/link";
import Button from "../common/Button";

const collections = [
  {
    category: "Women",
    title: "The Essence",
    subtitle: "Fluid silhouettes and pure organic textures.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
    href: "/women"
  },
  {
    category: "Men",
    title: "The Structure",
    subtitle: "Architectural lines and refined tailoring.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1287&auto=format&fit=crop",
    href: "/men"
  },
  {
    category: "Kids",
    title: "The Play",
    subtitle: "Comfortable craft for the next generation.",
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1470&auto=format&fit=crop",
    href: "/kids"
  }
];

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] lg:h-[90vh] flex flex-col lg:flex-row bg-[#F4F4F4]">
      {collections.map((col, index) => (
        <div 
          key={col.category}
          className="relative flex-1 h-full w-full group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/20 last:border-0"
        >
          {/* Background Image using valid external Unsplash URL */}
          <img
            src={col.image}
            alt={`${col.category} Collection`}
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-1000 group-hover:bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 fade-in z-10 text-white">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-2">
               {col.category}
             </span>
             <h2 className="text-4xl md:text-5xl lg:text-5xl font-black uppercase tracking-[-0.03em] leading-none mb-4">
               {col.title}
             </h2>
             
             {/* Hidden paragraph that slides up on hover on desktop */}
             <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out hidden lg:grid">
               <div className="overflow-hidden">
                 <p className="text-sm font-medium italic opacity-80 mb-6 max-w-[280px]">
                   {col.subtitle}
                 </p>
               </div>
             </div>
             
             {/* Always visible on mobile */}
             <p className="text-sm font-medium italic opacity-80 mb-6 max-w-[280px] lg:hidden block">
               {col.subtitle}
             </p>

             <Link 
               href={col.href}
               className="inline-flex items-center justify-center h-12 px-8 w-fit bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-colors duration-300"
             >
               Explore
             </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
