import { gql } from "@apollo/client";
// USER /////////////////////////////////

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $username: String!, $password: String!, $email: String!) {
    addUser(name: $name, username: $username, password: $password, email: $email) {
      email
      token
    }
  }
`;
