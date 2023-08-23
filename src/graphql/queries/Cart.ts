import { gql } from "@apollo/client";

// CART ////////////////////////////////

export const VIEW_CART = gql`
  query viewCart($token: String!) {
    viewCart(token: $token) {
      cart_item_id
      quantity
      subtotal
      cart {
        cart_id
      }
      product {
        name
        price
        image
      }
    }
  }
  `;