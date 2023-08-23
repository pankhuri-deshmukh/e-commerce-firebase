import { gql } from "@apollo/client";

// ORDER ////////////////////////////

export const VIEW_ALL_ORDERS = gql`
query viewOrders($token: String!) {
  viewOrders(token: $token) {
    order_id
    payment_status
    total_amount
    order_status
  }
}
`;

export const VIEW_ORDER_DETAILS = gql`
  query viewOrderDetails($order_id: Int!, $token: String!) {
    viewOrderDetails(order_id: $order_id, token: $token) {
      product {
        name
        image
      }
      quantity
      subtotal
    }
  }
`;
