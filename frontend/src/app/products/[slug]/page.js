import { gql } from "@apollo/client";
import { notFound } from "next/navigation";
import { getApolloClient } from "../../../lib/apolloClient";
import Breadcrumb from "../../../components/common/Breadcrumb";
import ProductDetails from "../../../components/product/ProductDetails";
import ProductGallery from "../../../components/product/ProductGallery";
import RelatedProducts from "../../../components/product/RelatedProducts";

const PRODUCT_PAGE_QUERY = gql`
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
              description
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

function mapNodes(connection) {
  return connection?.edges?.map((edge) => edge.node) ?? [];
}

async function getProductData(slug) {
  // The route slug is used here as GraphQL variable `urlKey`.
  const client = getApolloClient();

  const { data } = await client.query({
    query: PRODUCT_PAGE_QUERY,
    variables: {
      urlKey: slug,
    },
  });

  return data?.product ?? null;
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProductData(slug);

  if (!product) {
    notFound();
  }

  const primaryCategory = product.categories?.edges?.[0]?.node;
  const relatedProducts = mapNodes(product.relatedProducts);

  return (
    <div className="site-container" style={{ padding: "36px 0 72px" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          primaryCategory?.translation?.slug
            ? {
                label: primaryCategory.translation.name,
                href: `/categories/${primaryCategory.translation.slug}`,
              }
            : null,
          { label: product.name },
        ].filter(Boolean)}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "start" }}>
        <div style={{ flex: "1 1 520px", minWidth: "300px" }}>
          {/* Product data is passed into the reusable gallery component here. */}
          <ProductGallery product={product} />
        </div>

        <div style={{ flex: "1 1 420px", minWidth: "300px" }}>
          {/* Product data is passed into the reusable details component here. */}
          <ProductDetails product={product} />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
