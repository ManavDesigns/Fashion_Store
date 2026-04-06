import { notFound } from "next/navigation";
import Breadcrumb from "../../../components/common/Breadcrumb";
import ProductDetails from "../../../components/product/ProductDetails";
import ProductGallery from "../../../components/product/ProductGallery";
import ProductCard from "../../../components/product/ProductCard";

const PRODUCT_QUERY = `
  query GetProductBySlug($urlKey: String!) {
    product(urlKey: $urlKey) {
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
      description
      descriptionHtml
      isSaleable
      categories {
        edges {
          node {
            id
            _id
            translation {
              name
              slug
            }
          }
        }
      }
      images {
        edges {
          node {
            id
            _id
            path
            publicPath
            position
          }
        }
      }
      relatedProducts {
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
          }
        }
      }
    }
  }
`;

async function getProductData(urlKey) {
  const endpoint = process.env.NEXT_PUBLIC_BAGISTO_GRAPHQL_ENDPOINT;
  const storefrontKey = process.env.NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY || "";
  if (!endpoint) return null;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(storefrontKey && { "x-storefront-key": storefrontKey }),
      },
      body: JSON.stringify({ query: PRODUCT_QUERY, variables: { urlKey } }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const { data, errors } = await res.json();
    if (errors || !data?.product) return null;
    return data.product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductData(slug);
  return {
    title: product ? `${product.name} | The Atelier` : "Product Not Found | The Atelier",
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProductData(slug);

  if (!product) notFound();

  const primaryCategory = product.categories?.edges?.[0]?.node;
  const relatedProducts = product.relatedProducts?.edges?.map((e) => e.node) ?? [];
  const galleryImages = product.images?.edges?.map((e) => e.node) ?? [];

  return (
    <main className="bg-white min-h-screen border-t border-border/40">
      <div className="site-container py-10 pb-24">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            primaryCategory?.translation?.slug
              ? { label: primaryCategory.translation.name, href: `/categories/${primaryCategory.translation.slug}` }
              : null,
            { label: product.name },
          ].filter(Boolean)}
        />

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-10">
          {/* Gallery */}
          <div>
            <ProductGallery product={{ ...product, images: { edges: product.images?.edges ?? [] } }} />
          </div>

          {/* Details */}
          <div>
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-border/40">
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary opacity-60">
                You May Also Like
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-primary mt-2">
                Related Pieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
