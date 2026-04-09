import { gql } from "@apollo/client";
import { getApolloClient } from "../lib/apolloClient";
import { mapConnectionNodes } from "../lib/utils";
import { getFrontendProduct } from "../lib/bagisto";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";
import CategorySection from "../components/home/CategorySection";
import PromoBanner from "../components/home/PromoBanner";
import Newsletter from "../components/home/Newsletter";

const HOME_PAGE_QUERY = gql`
  query GetHomePageData($firstProducts: Int, $firstCategories: Int, $channel: String, $locale: String) {
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
        }
      }
    }
    categories(first: $firstCategories) {
      edges {
        node {
          id
          _id
          url
          logoUrl
          bannerUrl
          translation {
            id
            name
            slug
            locale
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
  }
`;

async function getHomePageData() {
  const client = getApolloClient();

  const { data } = await client.query({
    query: HOME_PAGE_QUERY,
    variables: {
      firstProducts: 12,
      firstCategories: 6,
      channel: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE,
      locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE,
    },
  });

  const products = mapConnectionNodes(data?.products);
  const categories = mapConnectionNodes(data?.categories).filter(
    (category) => category._id !== 1
  );

  const featuredCollection = products
    .filter((product) => product.featured === "1")
    .slice(0, 4);

  const newArrivalCollection = products
    .filter((product) => product.isNew === "1")
    .slice(0, 4);

  return {
    featuredProducts:
      featuredCollection.length > 0 ? featuredCollection : products.slice(0, 4),
    newArrivals:
      newArrivalCollection.length > 0
        ? newArrivalCollection
        : products.slice(4, 8).length > 0
          ? products.slice(4, 8)
          : products.slice(0, 4),
    categories: categories.slice(0, 3),
  };
}


// export default async function HomePage() {
//   const product = await getFrontendProduct(12);

//   console.log(product);

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{product.price}</p>
//     </div>
//   );
// }


export default async function HomePage() {
  const { featuredProducts, newArrivals, categories } = await getHomePageData();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <NewArrivals products={newArrivals} />
      <CategorySection categories={categories} />
      <PromoBanner />
      <Newsletter />
    </>
  );
}
