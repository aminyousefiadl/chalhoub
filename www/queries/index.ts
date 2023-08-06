import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query ExampleQuery(
    $page: Int
    $limit: Int
    $color: String
    $price: Price
    $sort: Status
  ) {
    products(
      page: $page
      limit: $limit
      color: $color
      price: $price
      sort: $sort
    ) {
      data {
        _id
        title
        price
        color
        brand
        imageUrl
        recommended
        createdAt
      }
      count
      totalCount
      nextPage
      prevPage
      totalPages
    }
  }
`;
