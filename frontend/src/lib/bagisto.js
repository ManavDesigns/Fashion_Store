const PRODUCT_CARD_FIELDS = `
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
`;

const PRODUCTS_QUERY = `
  query GetProducts(
    $first: Int
    $query: String
    $filter: String
    $channel: String
    $locale: String
  ) {
    products(
      first: $first
      query: $query
      filter: $filter
      channel: $channel
      locale: $locale
    ) {
      edges {
        node {
          ${PRODUCT_CARD_FIELDS}
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query GetProduct(
    $id: ID
    $sku: String
    $urlKey: String
  ) {
    product(id: $id, sku: $sku, urlKey: $urlKey) {
      ${PRODUCT_CARD_FIELDS}
      description
      descriptionHtml
      images {
        edges {
          node {
            url
            path
          }
        }
      }
      reviews {
        edges {
          node {
            id
            title
            comment
            rating
          }
        }
      }
    }
  }
`;

// Use explicit property references so Next.js can statically inline
// NEXT_PUBLIC_* values for the client-side bundle at build time.
// Dynamic process.env[name] access is NOT resolved by Next.js on the client.
const BAGISTO_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT,
  graphqlEndpoint: process.env.NEXT_PUBLIC_BAGISTO_GRAPHQL_ENDPOINT,
  storefrontKey: process.env.NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY,
  channelCode: process.env.NEXT_PUBLIC_BAGISTO_CHANNEL_CODE,
  locale: process.env.NEXT_PUBLIC_BAGISTO_LOCALE,
};

function getConfig(key) {
  const value = BAGISTO_CONFIG[key];

  if (!value) {
    throw new Error(`Missing required Bagisto config: ${key}`);
  }

  return value;
}

function resolveBagistoUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path, getConfig("endpoint")).toString();
}

function storefrontHeaders(extraHeaders = {}) {
  return {
    "Content-Type": "application/json",
    "X-STOREFRONT-KEY": getConfig("storefrontKey"),
    ...extraHeaders,
  };
}

function pickErrorMessage(payload, fallback) {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (payload?.message) {
    return payload.message;
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const firstError = payload.errors[0];

    if (typeof firstError === "string") {
      return firstError;
    }

    if (firstError?.message) {
      return firstError.message;
    }
  }

  return fallback;
}

async function parseResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(pickErrorMessage(payload, fallbackMessage));
  }

  return payload;
}

function connectionToItems(connection) {
  return connection?.edges?.map((edge) => edge.node) ?? [];
}

export async function getFrontendProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT}/api/frontend/products/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function bagistoFetch(query, variables = {}, options = {}) {
  // GraphQL helper:
  // Use this when you want to GET data through Bagisto GraphQL.
  // Route used: POST /api/graphql
  const response = await fetch(getConfig("graphqlEndpoint"), {
    method: "POST",
    headers: storefrontHeaders(options.headers),
    body: JSON.stringify({ query, variables }),
    cache: options.cache ?? "no-store",
  });

  const payload = await parseResponse(response, "Bagisto GraphQL request failed");

  if (payload?.errors?.length) {
    throw new Error(pickErrorMessage(payload, "Bagisto GraphQL request failed"));
  }

  return payload.data;
}

export async function bagistoRest(path, options = {}) {
  // REST helper:
  // Use this when you want to call normal HTTP routes like GET, POST, PUT, DELETE.
  // Example routes: /api/shop/add-product-in-cart, /api/customer/login
  const response = await fetch(resolveBagistoUrl(path), {
    method: options.method ?? "GET",
    headers: storefrontHeaders(options.headers),
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache ?? "no-store",
    credentials: options.credentials ?? "include",
  });

  return parseResponse(response, `Bagisto request failed for ${path}`);
}

export const catalogApi = {
  async getProducts(options = {}) {
    // Use for:
    // Get product list from Bagisto.
    // Route used: POST /api/graphql
    const data = await bagistoFetch(PRODUCTS_QUERY, {
      first: options.first ?? 12,
      query: options.query ?? null,
      filter: options.filter ?? null,
      channel: options.channel ?? null,
      locale: options.locale ?? null,
    });

    return {
      ...data.products,
      items: connectionToItems(data.products),
    };
  },

  async getProduct(options = {}) {
    // Use for:
    // Get one product by id, sku, or urlKey.
    // Route used: POST /api/graphql
    if (!options.id && !options.sku && !options.urlKey) {
      throw new Error("Provide id, sku, or urlKey to fetch a product");
    }

    const data = await bagistoFetch(PRODUCT_QUERY, {
      id: options.id ?? null,
      sku: options.sku ?? null,
      urlKey: options.urlKey ?? null,
    });

    return data.product;
  },

  getCategoriesTree() {
    // Use for:
    // Get category tree data.
    // Route used: GET /api/categories/tree
    return bagistoRest("/api/categories/tree");
  },

  getCategories() {
    // Use for:
    // Get all categories.
    // Route used: GET /api/categories
    return bagistoRest("/api/categories");
  },

  getProductReviews(productId) {
    // Use for:
    // Get reviews of one product.
    // Route used: GET /api/product/{productId}/reviews
    return bagistoRest(`/api/product/${productId}/reviews`);
  },
};

export const directoryApi = {
  getCountries() {
    // Use for:
    // Get country list for checkout or address forms.
    // Route used: GET /api/core/countries
    return bagistoRest("/api/core/countries");
  },

  getStates(countryCode) {
    // Use for:
    // Get states of one country.
    // Route used: GET /api/shop/countries/{countryCode}/states
    if (!countryCode) {
      throw new Error("countryCode is required to fetch states");
    }

    return bagistoRest(`/api/shop/countries/${countryCode}/states`);
  },
};

export const customerApi = {
  register(customer) {
    // Use for:
    // Register a new customer account.
    // Route used: POST /api/shop/customers
    // Sends: customer object
    return bagistoRest("/api/shop/customers", {
      method: "POST",
      body: customer,
    });
  },

  login(credentials) {
    // Use for:
    // Login customer from frontend.
    // Route used: POST /api/customer/login
    // Sends: { email, password }
    return bagistoRest("/api/customer/login", {
      method: "POST",
      body: credentials,
    });
  },

  logout() {
    // Use for:
    // Logout customer from frontend.
    // Route used: GET /api/customer/logout
    return bagistoRest("/api/customer/logout", {
      method: "GET",
    });
  },

  getAddresses() {
    // Use for:
    // Get logged-in customer's addresses.
    // Route used: GET /api/customer/addresses
    return bagistoRest("/api/customer/addresses");
  },

  createAddress(address) {
    // Use for:
    // Create a new customer address.
    // Route used: POST /api/customer/addresses
    // Sends: address object
    return bagistoRest("/api/customer/addresses", {
      method: "POST",
      body: address,
    });
  },

  updateAddress(id, address) {
    // Use for:
    // Update an existing customer address.
    // Route used: PUT /api/customer/addresses/edit/{id}
    // Sends: address object
    return bagistoRest(`/api/customer/addresses/edit/${id}`, {
      method: "PUT",
      body: address,
    });
  },
};

export const cartApi = {
  get() {
    // Use for:
    // Get current cart data.
    // Route used: GET /api/checkout/cart
    return bagistoRest("/api/checkout/cart");
  },

  addItem({ productId, quantity = 1, options }) {
    // Use for:
    // Add product to cart.
    // Route used: POST /api/shop/add-product-in-cart
    // Sends: { productId, quantity, options? }
    return bagistoRest("/api/shop/add-product-in-cart", {
      method: "POST",
      body: {
        productId,
        quantity,
        ...(options ? { options } : {}),
      },
    });
  },

  updateItem({ cartItemId, quantity }) {
    // Use for:
    // Update quantity of one cart item.
    // Route used: POST /api/shop/update-cart-item
    // Sends: { cartItemId, quantity }
    return bagistoRest("/api/shop/update-cart-item", {
      method: "POST",
      body: {
        cartItemId,
        quantity,
      },
    });
  },

  removeItem(cartItemId) {
    // Use for:
    // Remove one cart item.
    // Route used: POST /api/shop/remove-cart-item
    // Sends: { cartItemId }
    return bagistoRest("/api/shop/remove-cart-item", {
      method: "POST",
      body: {
        cartItemId,
      },
    });
  },

  removeItems(itemIds) {
    // Use for:
    // Remove many cart items together.
    // Route used: POST /api/shop/remove-cart-items
    // Sends: { itemIds }
    return bagistoRest("/api/shop/remove-cart-items", {
      method: "POST",
      body: {
        itemIds,
      },
    });
  },

  applyCoupon(couponCode) {
    // Use for:
    // Apply coupon on cart.
    // Route used: POST /api/shop/apply-coupon
    // Sends: { couponCode }
    return bagistoRest("/api/shop/apply-coupon", {
      method: "POST",
      body: {
        couponCode,
      },
    });
  },

  removeCoupon() {
    // Use for:
    // Remove coupon from cart.
    // Route used: POST /api/shop/remove-coupon
    return bagistoRest("/api/shop/remove-coupon", {
      method: "POST",
      body: {},
    });
  },

  moveToWishlist() {
    // Use for:
    // Move cart items to wishlist.
    // Route used: POST /api/checkout/cart/move-to-wishlist
    return bagistoRest("/api/checkout/cart/move-to-wishlist", {
      method: "POST",
    });
  },
};

export const wishlistApi = {
  get() {
    // Use for:
    // Get wishlist items.
    // Route used: GET /api/customer/wishlist
    return bagistoRest("/api/customer/wishlist");
  },

  add(productId) {
    // Use for:
    // Add product to wishlist.
    // Route used: POST /api/customer/wishlist
    // Sends: { product_id }
    return bagistoRest("/api/customer/wishlist", {
      method: "POST",
      body: {
        product_id: productId,
      },
    });
  },

  remove(id) {
    // Use for:
    // Remove one wishlist item.
    // Route used: DELETE /api/customer/wishlist/{id}
    return bagistoRest(`/api/customer/wishlist/${id}`, {
      method: "DELETE",
    });
  },

  clear() {
    // Use for:
    // Remove all wishlist items.
    // Route used: DELETE /api/customer/wishlist/all
    return bagistoRest("/api/customer/wishlist/all", {
      method: "DELETE",
    });
  },

  moveToCart(id) {
    // Use for:
    // Move one wishlist item to cart.
    // Route used: POST /api/customer/wishlist/{id}/move-to-cart
    return bagistoRest(`/api/customer/wishlist/${id}/move-to-cart`, {
      method: "POST",
    });
  },
};

export const checkoutApi = {
  getSummary() {
    // Use for:
    // Get checkout summary data.
    // Route used: GET /api/checkout/onepage/summary
    return bagistoRest("/api/checkout/onepage/summary");
  },

  estimateShippingMethods(payload) {
    // Use for:
    // Get available shipping methods from address/cart data.
    // Route used: POST /api/checkout/cart/estimate-shipping-methods
    // Sends: address or checkout payload
    return bagistoRest("/api/checkout/cart/estimate-shipping-methods", {
      method: "POST",
      body: payload,
    });
  },

  saveAddresses(payload) {
    // Use for:
    // Save billing and shipping address in checkout.
    // Route used: POST /api/checkout/onepage/addresses
    // Sends: billing/shipping address payload
    return bagistoRest("/api/checkout/onepage/addresses", {
      method: "POST",
      body: payload,
    });
  },

  saveShippingMethod(payload) {
    // Use for:
    // Save shipping method in checkout.
    // Route used: POST /api/checkout/onepage/shipping-methods
    // Sends: selected shipping method payload
    return bagistoRest("/api/checkout/onepage/shipping-methods", {
      method: "POST",
      body: payload,
    });
  },

  savePaymentMethod(payload) {
    // Use for:
    // Save payment method in checkout.
    // Route used: POST /api/checkout/onepage/payment-methods
    // Sends: selected payment method payload
    return bagistoRest("/api/checkout/onepage/payment-methods", {
      method: "POST",
      body: payload,
    });
  },

  placeOrder(payload) {
    // Use for:
    // Final order placement.
    // Route used: POST /api/checkout/onepage/orders
    // Sends: final checkout/order payload
    return bagistoRest("/api/checkout/onepage/orders", {
      method: "POST",
      body: payload,
    });
  },
};

export const bagistoApi = {
  catalog: catalogApi,
  directory: directoryApi,
  customer: customerApi,
  cart: cartApi,
  wishlist: wishlistApi,
  checkout: checkoutApi,
  graphql: bagistoFetch,
  rest: bagistoRest,
};
