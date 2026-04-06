import { gql } from "@apollo/client";
import { getApolloClient } from "../../lib/apolloClient";
import Breadcrumb from "../../components/common/Breadcrumb";
import FilterSidebar from "../../components/common/FilterSidebar";
import SectionTitle from "../../components/common/SectionTitle";
import SortDropdown from "../../components/common/SortDropdown";
import ProductGrid from "../../components/product/ProductGrid";

const PRODUCTS_PAGE_QUERY = gql`
  query GetProductsPageData($firstProducts: Int, $firstCategories: Int, $channel: String, $locale: String) {
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
    categories(first: $firstCategories) {
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
  }
`;

function mapNodes(connection) {
  return connection?.edges?.map((edge) => edge.node) ?? [];
}

function sortProducts(products, sort) {
  const items = [...products];

  switch (sort) {
    case "price-low":
      return items.sort((a, b) => Number(a.minimumPrice || a.price || 0) - Number(b.minimumPrice || b.price || 0));
    case "price-high":
      return items.sort((a, b) => Number(b.maximumPrice || b.price || 0) - Number(a.maximumPrice || a.price || 0));
    case "name-a-z":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return items.sort((a, b) => Number(b.isNew || 0) - Number(a.isNew || 0));
    default:
      return items.sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0));
  }
}

async function getProductsPageData() {
  // Backend data is fetched here from Bagisto GraphQL.
  const client = getApolloClient();

  const { data } = await client.query({
    query: PRODUCTS_PAGE_QUERY,
    variables: {
      firstProducts: 80,
      firstCategories: 50,
      channel: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE,
      locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE,
    },
  });

  return {
    products: mapNodes(data?.products),
    categories: mapNodes(data?.categories).filter((category) => category._id !== 1),
  };
}

export default async function ProductsPage({ searchParams }) {
  const params = new URLSearchParams(await searchParams);
  const categorySlug = params.get("category");
  const productType = params.get("type");
  const sort = params.get("sort") || "";

  const { products, categories } = await getProductsPageData();

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const matchesCategory = categorySlug
        ? product.categories?.edges?.some(
            (edge) => edge.node?.translation?.slug === categorySlug
          )
        : true;

      const matchesType = productType ? product.type === productType : true;

      return matchesCategory && matchesType;
    }),
    sort
  );

  const typeOptions = [...new Set(products.map((product) => product.type).filter(Boolean))].map(
    (type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
      count: products.filter((product) => product.type === type).length,
    })
  );

  const categoryOptions = categories
    .filter((category) => category.translation?.slug)
    .map((category) => ({
      label: category.translation?.name || "Category",
      value: category.translation?.slug,
      count: products.filter((product) =>
        product.categories?.edges?.some(
          (edge) => edge.node?.translation?.slug === category.translation?.slug
        )
      ).length,
    }));

  return (
    <div className="site-container" style={{ padding: "36px 0 72px" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <SectionTitle
        eyebrow="All Products"
        title="Discover the full fashion collection"
        description="This page fetches products from Bagisto GraphQL, then passes the data into ProductGrid after sorting and filtering."
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "start" }}>
        <div style={{ flex: "0 0 280px", width: "100%", maxWidth: "280px" }}>
          <FilterSidebar
            title="Refine Products"
            basePath="/products"
            searchParams={params}
            groups={[
              { key: "category", label: "Categories", options: categoryOptions },
              { key: "type", label: "Product Type", options: typeOptions },
            ]}
          />
        </div>

        <div style={{ flex: "1 1 720px", minWidth: 0, display: "grid", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <p style={{ margin: 0, color: "#6a5e55" }}>
              {filteredProducts.length} products available
            </p>

            <SortDropdown
              basePath="/products"
              searchParams={params}
              currentValue={sort}
              options={[
                { label: "Recommended", value: "" },
                { label: "Newest", value: "newest" },
                { label: "Price: Low to High", value: "price-low" },
                { label: "Price: High to Low", value: "price-high" },
                { label: "Name: A to Z", value: "name-a-z" },
              ]}
            />
          </div>

          {/* Backend data is passed here into the reusable grid component. */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
