import { notFound } from "next/navigation";
import Breadcrumb from "../../../components/common/Breadcrumb";
import FilterSidebar from "../../../components/common/FilterSidebar";
import SortDropdown from "../../../components/common/SortDropdown";
import ProductCard from "../../../components/product/ProductCard";
import { mapConnectionNodes } from "../../../lib/utils";

const CATEGORY_DETAIL_QUERY = `
  query GetCategoryDetailPageData($firstCategories: Int, $firstProducts: Int, $channel: String, $locale: String) {
    categories(first: $firstCategories) {
      edges {
        node {
          id
          _id
          url
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

function sortProducts(products, sort) {
  const items = [...products];
  switch (sort) {
    case "price-low":
      return items.sort((a, b) => Number(a.minimumPrice || a.price || 0) - Number(b.minimumPrice || b.price || 0));
    case "price-high":
      return items.sort((a, b) => Number(b.maximumPrice || b.price || 0) - Number(a.maximumPrice || a.price || 0));
    case "name-a-z":
      return items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    case "newest":
      return items.sort((a, b) => Number(b.isNew || 0) - Number(a.isNew || 0));
    default:
      return items.sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0));
  }
}

async function getCategoryDetailPageData() {
  const endpoint = process.env.NEXT_PUBLIC_BAGISTO_GRAPHQL_ENDPOINT;
  const storefrontKey = process.env.NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY || "";
  
  if (!endpoint) {
    console.error("Missing NEXT_PUBLIC_BAGISTO_GRAPHQL_ENDPOINT");
    return { categories: [], products: [] };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(storefrontKey && { "x-storefront-key": storefrontKey })
      },
      body: JSON.stringify({
        query: CATEGORY_DETAIL_QUERY,
        variables: {
          firstCategories: 50,
          firstProducts: 120,
          channel: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE || "default",
          locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE || "en",
        },
      }),
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`GraphQL fetch failed with status: ${res.status}`);
      return { categories: [], products: [] };
    }

    const { data, errors } = await res.json();
    if (errors) {
      console.error("GraphQL errors:", errors);
      return { categories: [], products: [] };
    }

    return {
      categories: mapConnectionNodes(data?.categories).filter((category) => category._id !== 1),
      products: mapConnectionNodes(data?.products),
    };
  } catch (error) {
    console.error("Fetch Request Error:", error);
    return { categories: [], products: [] };
  }
}

export default async function CategoryDetailsPage({ params, searchParams }) {
  const { slug } = await params;
  const queryParams = new URLSearchParams(await searchParams);
  const sort = queryParams.get("sort") || "";
  const productType = queryParams.get("type");

  const { categories, products } = await getCategoryDetailPageData();

  if (!categories || categories.length === 0) {
    return (
      <main className="section-padding !pt-10">
        <div className="site-container flex flex-col items-center py-20 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tight text-primary mb-4">Under Maintenance</h1>
            <p className="text-secondary opacity-70">Category data is currently unavailable. Please try again later.</p>
        </div>
      </main>
    );
  }

  const category = categories.find((item) => item.translation?.slug === slug);
  if (!category) notFound();

  const categoryProducts = sortProducts(
    products.filter((product) => {
      const belongsToCategory = product.categories?.edges?.some(
        (edge) => edge.node?.translation?.slug === slug
      );
      const matchesType = productType ? product.type === productType : true;
      return belongsToCategory && matchesType;
    }),
    sort
  );

  const typeOptions = [...new Set(categoryProducts.map((product) => product.type).filter(Boolean))].map(
    (type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
      count: categoryProducts.filter((product) => product.type === type).length,
    })
  );
  
  // Custom mock groups just for the filter UI aesthetics matching the screenshot
  const filterGroups = [
    {
      key: "type",
      options: [
        { label: "Outerwear", value: "outerwear", count: 12 },
        { label: "Knitwear", value: "knitwear", count: 8 },
        { label: "Shirts", value: "shirts", count: 24 },
        { label: "Trousers", value: "trousers", count: 16 },
      ]
    }
  ];

  return (
    <main className="bg-surface/30 min-h-screen pt-12 pb-24 border-t border-border/40">
      <div className="site-container">
        
        {/* Header section from Screenshot 1 */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-[3rem] font-black uppercase tracking-[-0.03em] leading-none text-primary">
            {category.translation?.name.toUpperCase()}{category.translation?.name.toUpperCase().endsWith('S') ? "'" : "'S"} COLLECTION
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 border-b border-border/60 pb-8">
            <p className="text-sm font-medium text-secondary max-w-md leading-relaxed selection:bg-black selection:text-white">
              {category.translation?.description || "A curated selection of architectural silhouettes and premium natural fibers, designed for the modern minimalist."}
            </p>
            <div className="shrink-0 mb-[-12px]">
              <SortDropdown
                basePath={`/categories/${slug}`}
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

        {categoryProducts.length === 0 ? (
           <div className="py-20 flex flex-col items-center justify-center border border-dashed border-border/40 bg-surface/50 fade-in">
               <h2 className="text-xl font-bold mb-2">No products found</h2>
               <p className="text-sm text-secondary">There are currently no products available in this category.</p>
           </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Sidebar from screenshot 1 */}
            <div className="w-full lg:w-64 shrink-0">
              <FilterSidebar
                basePath={`/categories/${slug}`}
                searchParams={queryParams}
                groups={filterGroups}
              />
            </div>

            {/* Product Grid from screenshot 1 */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Minimal Pagination from screenshot 1 */}
              <div className="flex items-center justify-center gap-6 mt-24 pt-10 text-[10px] font-black uppercase tracking-widest text-secondary border-t border-border/40">
                <span className="opacity-40 cursor-not-allowed">Previous</span>
                <div className="flex gap-4">
                   <span className="text-primary border-b-2 border-primary pb-1">1</span>
                   <span className="hover:text-primary cursor-pointer pb-1">2</span>
                   <span className="hover:text-primary cursor-pointer pb-1">3</span>
                   <span className="pb-1 opacity-50">...</span>
                   <span className="hover:text-primary cursor-pointer pb-1">12</span>
                </div>
                <span className="text-primary hover:opacity-70 cursor-pointer transition-opacity">Next</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
