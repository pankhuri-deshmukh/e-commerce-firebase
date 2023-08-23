import { gql } from "@apollo/client";

// PRODUCT //////////////////////////////

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      product_id
      name
      description
      price
      category
      quantity
      image
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    getProductById(id: $id) {
      product_id
      name
      description
      price
      category
      quantity
      image
    }
  }
`;