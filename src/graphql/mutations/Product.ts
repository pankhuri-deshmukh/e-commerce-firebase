import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $category: String!
    $quantity: Int!
    $image: String!
    $token: String!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      category: $category
      quantity: $quantity
      image: $image
      token: $token
    ) {
      name
      price
    }
  }
`;