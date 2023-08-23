import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($payment_status: String!, $token: String!) {
    createOrder(payment_status: $payment_status, token: $token) {
      order_id
      payment_status
      total_amount
      user {
        user_id
        email
        role
      }
    }
  }
`;

export const CANCEL_ORDER = gql`
mutation cancelOrder($order_id:Int!, $token: String!){
  cancelOrder(order_id: $order_id, token: $token) {
    order_id
  }
}
`;
