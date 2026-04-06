import { gql } from "@apollo/client";

/**
 * Auth Mutations
 */
export const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($input: createCustomerLoginInput!) {
    createCustomerLogin(input: $input) {
      clientMutationId
      customerLogin
      customer {
        id
        _id
        firstName
        lastName
        email
        token
      }
    }
  }
`;

export const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer($input: createCustomerInput!) {
    createCustomer(input: $input) {
      clientMutationId
      customer {
        id
        firstName
        lastName
        email
        token
      }
    }
  }
`;

/**
 * Cart Mutations
 */
export const ADD_TO_CART = gql`
  mutation AddToCart($input: createAddProductInCartInput!) {
    createAddProductInCart(input: $input) {
      clientMutationId
      addProductInCart {
        id
        cart {
          id
          itemsCount
          items {
            id
            quantity
            price
            total
            product {
              id
              name
              sku
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($input: createRemoveCartItemInput!) {
    removeCartItem(input: $input) {
      clientMutationId
      removeCartItem {
        id
        itemsCount
        grandTotal
      }
    }
  }
`;

/**
 * Wishlist Mutations
 */
export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($input: createAddProductToWishlistInput!) {
    addToWishlist(input: $input) {
      clientMutationId
      addToWishlist {
        id
        product {
          id
          name
        }
      }
    }
  }
`;
