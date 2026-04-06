import Image from "next/image";
import Link from "next/link";
import { resolveBagistoAssetUrl } from "../../lib/utils";

function getCategoryLabel(category) {
  return category?.translation?.name || "Collection";
}

export default function CategoryCard({ category }) {
  const label = getCategoryLabel(category);
  const image = resolveBagistoAssetUrl(category.logoUrl || category.bannerUrl);
  const childCount = category?.children?.edges?.length ?? 0;
  const href = category?.translation?.slug ? `/categories/${category.translation.slug}` : "/";

  return (
    <article className="category-tile">
      <Link href={href} className="category-tile__media">
        {image ? (
          <Image
            src={image}
            alt={label}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        ) : (
          <span>{label}</span>
        )}
      </Link>

      <div className="category-tile__body">
        <p className="category-tile__eyebrow">Category</p>
        <h3>{label}</h3>
        <p>
          {childCount > 0
            ? `${childCount} subcategories available`
            : "Curated fashion essentials"}
        </p>
      </div>
    </article>
  );
}
