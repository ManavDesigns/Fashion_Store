import SectionTitle from "../common/SectionTitle";
import CategoryCard from "./CategoryCard";

export default function CategorySection({ categories = [] }) {
  if (!categories?.length) return null;

  return (
    <section className="section-padding bg-white border-b border-border/40">
      <div className="site-container">
        <div className="flex flex-col items-center mb-16 text-center">
          <SectionTitle
            eyebrow="Departments"
            title="Select Department"
            className="mb-0 text-center items-center"
          />
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-8 md:gap-x-16 gap-y-12">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
