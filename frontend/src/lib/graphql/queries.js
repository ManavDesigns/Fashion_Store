import { gql } from "@apollo/client";

/**
 * Product Fragments
 */
export const IMAGE_FRAGMENT = gql`
  fragment ImageFields on ProductImage {
    id
    url
    path
  }
`;

export const PRODUCT_FLAT_FRAGMENT = gql`
  fragment ProductFlatFields on Product {
    id
    _id
    sku
    type
    name
    urlKey
    price
    specialPrice
    baseImageUrl
    shortDescription
    featured
    new
    visibleIndividually
    status
    color
    size
  }
`;

/**
 * Category Fragments
 */
export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    _id
    name
    urlPath
    slug
    imageUrl
    logoUrl
    bannerUrl
    description
    status
  }
`;

/**
 * Queries
 */
export const GET_HOME_PAGE_CONTENT = gql`
  ${PRODUCT_FLAT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query GetHomePageContent($channel: String, $locale: String) {
    featuredProducts: products(featured: true, first: 8, channel: $channel, locale: $locale) {
      edges {
        node {
          ...ProductFlatFields
        }
      }
    }
    newArrivals: products(new: true, first: 8, channel: $channel, locale: $locale) {
      edges {
        node {
          ...ProductFlatFields
        }
      }
    }
    categories(first: 10) {
      edges {
        node {
          ...CategoryFields
        }
      }
    }
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  ${PRODUCT_FLAT_FRAGMENT}
  ${IMAGE_FRAGMENT}
  query GetProductDetail($urlKey: String!, $channel: String, $locale: String) {
    product(urlKey: $urlKey) {
      ...ProductFlatFields
      description
      descriptionHtml
      images {
        id
        url
        path
      }
      relatedProducts {
        ...ProductFlatFields
      }
      upSellProducts {
        ...ProductFlatFields
      }
    }
  }
`;

export const GET_CATEGORY_PRODUCTS = gql`
  ${PRODUCT_FLAT_FRAGMENT}
  query GetCategoryProducts($slug: String!, $first: Int, $page: Int, $filters: [FilterInput]) {
    category(slug: $slug) {
      id
      name
      products(first: $first, page: $page, filter: $filters) {
        edges {
          node {
            ...ProductFlatFields
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          currentPage
          lastPage
        }
      }
    }
  }
`;
