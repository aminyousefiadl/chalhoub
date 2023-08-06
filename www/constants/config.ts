export const graphqlURL = process.env.API_URL
  ? process.env.API_URL + "/graphql"
  : process.env.NEXT_PUBLIC_API_URL + "/graphql";
