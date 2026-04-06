import { gql } from "@apollo/client";
import { getApolloClient } from "../../lib/apolloClient";
import Breadcrumb from "../../components/common/Breadcrumb";
import EmptyState from "../../components/common/EmptyState";
import SectionTitle from "../../components/common/SectionTitle";
import CategoryCard from "../../components/category/CategoryCard";

const CATEGORIES_PAGE_QUERY = gql`
  query GetCategoriesPageData($firstCategories: Int, $firstProducts: Int, $channel: String, $locale: String) {
    categories(first: $firstCategories) {
      edges {
        node {
          id
          _id
          url
          logoUrl
          bannerUrl
          translation {
            name
            slug
            description
          }
          children {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
    products(first: $firstProducts, channel: $channel, locale: $locale) {
      edges {
        node {
          id
          categories {
            edges {
              node {
                _id
                translation {
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

function mapNodes(connection) {
  return connection?.edges?.map((edge) => edge.node) ?? [];
}

async function getCategoriesPageData() {
  // Categories and product references are fetched from Bagisto here.
  const client = getApolloClient();

  const { data } = await client.query({
    query: CATEGORIES_PAGE_QUERY,
    variables: {
      firstCategories: 50,
      firstProducts: 120,
      channel: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE,
      locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE,
    },
  });

  return {
    categories: mapNodes(data?.categories).filter((category) => category._id !== 1),
    products: mapNodes(data?.products),
  };
}

export default async function CategoriesPage() {
  const { categories, products } = await getCategoriesPageData();

  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    productCount: products.filter((product) =>
      product.categories?.edges?.some((edge) => edge.node?._id === category._id)
    ).length,
  }));

  return (
    <div className="site-container" style={{ padding: "36px 0 72px" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
      />

      <SectionTitle
        eyebrow="Categories"
        title="Browse every category in your fashion catalog"
        description="This page fetches category records from Bagisto and passes each one into the reusable CategoryCard component."
      />

      {categoriesWithCounts.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Categories from Bagisto will appear here once available."
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {categoriesWithCounts.map((category) => (
            <div key={category.id} style={{ display: "grid", gap: "10px" }}>
              <CategoryCard category={category} />
              <p style={{ margin: 0, color: "#6a5e55", fontSize: "0.92rem" }}>
                {category.productCount} products
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
