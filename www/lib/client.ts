import { graphqlURL } from "@/constants/config";
import { HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";

const GRAPHQL_ENDPOINT = graphqlURL;

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
  });
});
