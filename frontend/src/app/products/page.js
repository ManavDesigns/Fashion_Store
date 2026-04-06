import { notFound } from "next/navigation";
import Breadcrumb from "../../components/common/Breadcrumb";
import FilterSidebar from "../../components/common/FilterSidebar";
import SortDropdown from "../../components/common/SortDropdown";
import ProductCard from "../../components/product/ProductCard";
import { mapConnectionNodes } from "../../lib/utils";

export const metadata = { title: "All Products | The Atelier" };

const ALL_DATA_QUERY = `
  query GetAllData($firstCategories: Int, $firstProducts: Int, $channel: String, $locale: String) {
    categories(first: $firstCategories) {
      edges {
        node {
          id
          _id
          translation {
            name
            slug
            description
          }
        }
      }
    }
    products(first: $firstProducts, channel: $channel, locale: $locale) {
      edges {
        node {
          id
          _id
          sku
          name
          urlKey
          type
          price
          specialPrice
          minimumPrice
          maximumPrice
          baseImageUrl
          shortDescription
          featured
          isNew: new
          categories {
            edges {
              node {
                _id
                translation { name slug }
              }
            }
          }
        }
      }
    }
  }
`;

async function getData() {
  const endpoint = process.env.NEXT_PUBLIC_BAGISTO_GRAPHQL_ENDPOINT;
  const storefrontKey = process.env.NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY || "";
  if (!endpoint) return { categories: [], products: [] };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(storefrontKey && { "x-storefront-key": storefrontKey }),
      },
      body: JSON.stringify({
        query: ALL_DATA_QUERY,
        variables: {
          firstCategories: 50,
          firstProducts: 120,
          channel: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE || "default",
          locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE || "en",
        },
      }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return { categories: [], products: [] };
    const { data, errors } = await res.json();
    if (errors) return { categories: [], products: [] };
    return {
      categories: mapConnectionNodes(data?.categories).filter((c) => c._id !== 1),
      products: mapConnectionNodes(data?.products),
    };
  } catch {
    return { categories: [], products: [] };
  }
}

function sortProducts(products, sort) {
  const items = [...products];
  switch (sort) {
    case "price-low": return items.sort((a, b) => Number(a.minimumPrice || a.price || 0) - Number(b.minimumPrice || b.price || 0));
    case "price-high": return items.sort((a, b) => Number(b.maximumPrice || b.price || 0) - Number(a.maximumPrice || a.price || 0));
    case "name-a-z": return items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    case "newest": return items.sort((a, b) => Number(b.isNew || 0) - Number(a.isNew || 0));
    default: return items.sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0));
  }
}

export default async function ProductsPage({ searchParams }) {
  const params = new URLSearchParams(await searchParams);
  const categorySlug = params.get("category");
  const sort = params.get("sort") || "";

  const { categories, products } = await getData();

  const filtered = sortProducts(
    products.filter((p) => {
      if (!categorySlug) return true;
      return p.categories?.edges?.some((e) => e.node?.translation?.slug === categorySlug);
    }),
    sort
  );

  const categoryOptions = categories
    .filter((c) => c.translation?.slug)
    .map((c) => ({
      label: c.translation?.name || "Category",
      value: c.translation?.slug,
      count: products.filter((p) =>
        p.categories?.edges?.some((e) => e.node?.translation?.slug === c.translation?.slug)
      ).length,
    }));

  const filterGroups = [
    { key: "category", options: categoryOptions },
    {
      key: "type",
      options: [
        { label: "Outerwear", value: "outerwear", count: 0 },
        { label: "Knitwear", value: "knitwear", count: 0 },
        { label: "Shirts", value: "shirts", count: 0 },
        { label: "Trousers", value: "trousers", count: 0 },
      ],
    },
  ];

  return (
    <main className="bg-surface/30 min-h-screen border-t border-border/40">
      <div className="site-container py-12 pb-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Products" }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 mb-12 mt-6 gap-6">
          <div>
            <h1 className="text-4xl md:text-[3rem] font-black uppercase tracking-[-0.03em] leading-none text-primary">
              All Products
            </h1>
            <p className="text-sm font-medium text-secondary mt-3 italic opacity-80">
              {filtered.length} piece{filtered.length !== 1 ? "s" : ""} available
              {categorySlug ? ` in "${categorySlug}"` : ""}
            </p>
          </div>
          <div className="shrink-0">
            <SortDropdown
              basePath="/products"
              searchParams={params}
              currentValue={sort}
              options={[
                { label: "Recommended", value: "" },
                { label: "Newest Arrivals", value: "newest" },
                { label: "Price: Low to High", value: "price-low" },
                { label: "Price: High to Low", value: "price-high" },
                { label: "A to Z", value: "name-a-z" },
              ]}
            />
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <FilterSidebar basePath="/products" searchParams={params} groups={filterGroups} />
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center border border-dashed border-border/40 bg-white text-center gap-4">
                <h2 className="text-lg font-bold text-primary">No products found</h2>
                <p className="text-sm text-secondary">Try adjusting your filters or browse all categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
