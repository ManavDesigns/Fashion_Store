import { gql } from "@apollo/client";
import { getApolloClient } from "../../lib/apolloClient";
import Breadcrumb from "../../components/common/Breadcrumb";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import ProductGrid from "../../components/product/ProductGrid";

const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($first: Int, $query: String, $channel: String, $locale: String) {
    products(first: $first, query: $query, channel: $channel, locale: $locale) {
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
`;

function mapNodes(connection) {
  return connection?.edges?.map((edge) => edge.node) ?? [];
}

async function searchProducts(queryText) {
  if (!queryText) {
    return [];
  }

  const client = getApolloClient();
  const { data } = await client.query({
    query: SEARCH_PRODUCTS_QUERY,
    variables: {
      first: 40,
      query: queryText,
      channel: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE,
      locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE,
    },
  });

  return mapNodes(data?.products);
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const queryText = typeof params?.q === "string" ? params.q.trim() : "";
  const products = await searchProducts(queryText);

  return (
    <div className="site-container" style={{ padding: "36px 0 72px" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
      />

      <SectionTitle
        eyebrow="Search"
        title="Find the right style instantly"
        description="This page reads the search query from the URL, sends it to Bagisto GraphQL, and passes the matching results into ProductGrid."
      />

      <div style={{ marginBottom: "22px" }}>
        <SearchBar defaultValue={queryText} />
      </div>

      {queryText ? (
        <p style={{ margin: "0 0 22px", color: "#6a5e55" }}>
          Search results for <strong>{queryText}</strong>: {products.length} items
        </p>
      ) : (
        <p style={{ margin: "0 0 22px", color: "#6a5e55" }}>
          Enter a product name, style, or keyword to search the catalog.
        </p>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
