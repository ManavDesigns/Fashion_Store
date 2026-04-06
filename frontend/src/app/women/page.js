import Breadcrumb from "../../components/common/Breadcrumb";
import FilterSidebar from "../../components/common/FilterSidebar";
import SortDropdown from "../../components/common/SortDropdown";
import ProductCard from "../../components/product/ProductCard";
import { mapConnectionNodes } from "../../lib/utils";

export const metadata = { title: "Women's Collection | The Atelier" };

// Actual slug in Bagisto is "womens" (not "women")
const SLUG = "womens";
const WOMEN_SLUGS = ["womens", "formal-wear-female", "casual-wear-female", "active-wear-female", "footwear-female"];

const ALL_PRODUCTS_QUERY = `
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
                translation {
                  name
                  slug
                }
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
        query: ALL_PRODUCTS_QUERY,
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
  } catch (e) {
    return { categories: [], products: [] };
  }
}

export default async function WomenPage({ searchParams }) {
  const queryParams = new URLSearchParams(await searchParams);
  const sort = queryParams.get("sort") || "";

  const { categories, products } = await getData();

  const category = categories.find((c) => c.translation?.slug === SLUG);

  const categoryProducts = products.filter((product) =>
    product.categories?.edges?.some((edge) => WOMEN_SLUGS.includes(edge.node?.translation?.slug))
  );

  const sorted = [...categoryProducts].sort((a, b) => {
    if (sort === "price-low") return Number(a.minimumPrice || a.price || 0) - Number(b.minimumPrice || b.price || 0);
    if (sort === "price-high") return Number(b.maximumPrice || b.price || 0) - Number(a.maximumPrice || a.price || 0);
    if (sort === "name-a-z") return (a.name || "").localeCompare(b.name || "");
    return Number(b.featured || 0) - Number(a.featured || 0);
  });

  const filterGroups = [
    {
      key: "category",
      options: [
        { label: "Formal Wear", value: "formal-wear-female", count: 0 },
        { label: "Casual Wear", value: "casual-wear-female", count: 0 },
        { label: "Active Wear", value: "active-wear-female", count: 0 },
        { label: "Footwear", value: "footwear-female", count: 0 },
      ],
    },
  ];

  return (
    <main className="bg-surface/30 min-h-screen pt-12 pb-24 border-t border-border/40">
      <div className="site-container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Women" }]} />

        <div className="mb-16 mt-6">
          <h1 className="text-4xl md:text-[3rem] font-black uppercase tracking-[-0.03em] leading-none text-primary">
            {category ? `${category.translation?.name.toUpperCase()}'S COLLECTION` : "WOMEN'S COLLECTION"}
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 border-b border-border/60 pb-8">
            <p className="text-sm font-medium text-secondary max-w-md leading-relaxed">
              {category?.translation?.description ||
                "Fluid silhouettes and pure organic textures designed for an inherently modern lifestyle. Uncompromising elegance."}
            </p>
            <div className="shrink-0 mb-[-12px]">
              <SortDropdown
                basePath="/women"
                searchParams={queryParams}
                currentValue={sort}
                options={[
                  { label: "Newest Arrivals", value: "newest" },
                  { label: "Price: Low to High", value: "price-low" },
                  { label: "Price: High to Low", value: "price-high" },
                  { label: "A to Z", value: "name-a-z" },
                ]}
              />
            </div>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center border border-dashed border-border/40 bg-surface/50">
            <h2 className="text-xl font-bold mb-2">No products found</h2>
            <p className="text-sm text-secondary">
              There are no products in the Women's category yet. Make sure products are assigned to this category in Bagisto.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-64 shrink-0">
              <FilterSidebar basePath="/women" searchParams={queryParams} groups={filterGroups} />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
                {sorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
