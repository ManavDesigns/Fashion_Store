import Link from "next/link";

// Map actual Bagisto slugs → correct frontend routes + fallback images
const DEPARTMENT_MAP = {
  mens: {
    href: "/men",
    fallback: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1287&auto=format&fit=crop",
    label: "Men",
  },
  womens: {
    href: "/women",
    fallback: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
    label: "Women",
  },
  kids: {
    href: "/kids",
    fallback: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1470&auto=format&fit=crop",
    label: "Kids",
  },
};

export default function CategorySection({ categories = [] }) {
  // Only show the 3 main departments in a defined order
  const departments = Object.entries(DEPARTMENT_MAP).map(([slug, config]) => {
    // Try to find category from Bagisto data
    const cat = categories.find((c) => c.translation?.slug === slug);
    // Prefer Bagisto's banner/image, fall back to Unsplash
    const imageUrl = cat?.bannerUrl || cat?.imageUrl || config.fallback;
    return {
      slug,
      href: config.href,
      label: cat?.translation?.name || config.label,
      imageUrl,
    };
  });

  return (
    <section className="bg-white border-b border-border/40">
      <div className="site-container py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary opacity-60">
            Departments
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[-0.03em] text-primary mt-2">
            Shop by Department
          </h2>
        </div>

        {/* 3 Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.map((dept, index) => (
            <Link
              key={dept.slug}
              href={dept.href}
              className="group relative overflow-hidden aspect-[3/4] md:aspect-[2/3] block"
            >
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dept.imageUrl}
                alt={dept.label}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-700" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                  Collection
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-[-0.02em] text-white mb-4 leading-none">
                  {dept.label}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                    Shop Now
                  </span>
                  <div className="h-[1px] w-8 bg-white/60 group-hover:w-16 group-hover:bg-white transition-all duration-500 ease-out" />
                </div>
              </div>

              {/* Index number badge */}
              <div className="absolute top-6 left-6 text-[10px] font-black text-white/30 tracking-widest">
                0{index + 1}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
