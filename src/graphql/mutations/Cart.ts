import { gql } from "@apollo/client";

// CART //////////////////////////////

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart(
    $product_id: Int
    $quantity: Int
        $token: String
    ) {
      addItemToCart(
        product_id: $product_id
        quantity: $quantity
        token: $token
      ) {
      product {
        name
        price
      }
      subtotal
      cart_item_id
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
mutation removeItemFromCart(
  $cart_item_id: Int
  $token: String
  ) {
    removeItemFromCart(
      cart_item_id: $cart_item_id
      token: $token
    ) {
    cart_item_id
  }
}
`;


