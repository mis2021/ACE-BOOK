import {gql, useMutation} from '@apollo/client';


export const UPSERT_ACCOUNT = gql`
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    _id
    username
  }
}
`

// export const UPDATE_ACCOUNT = gql`
// mutation UpdateUser($input: RegisterInput!) {
//   updateUser(input: $input) {
//     _id
//     username
//   }
// }
// `