import { gql } from "@apollo/client";

export const CHECK_IF_ADMIN = gql`
query checkIfAdmin($token: String!) {
    checkIfAdmin(token: $token) {
      role
    }
  }
`;