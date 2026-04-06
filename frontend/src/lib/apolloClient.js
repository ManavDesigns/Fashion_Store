import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const httpLink = new HttpLink({
  uri: requireEnv("NEXT_PUBLIC_BAGISTO_GRAPHQL_ENDPOINT"),
  fetch,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "X-STOREFRONT-KEY": requireEnv("NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY"),
    },
  };
});

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}

export function getApolloClient() {
  return createApolloClient();
}
