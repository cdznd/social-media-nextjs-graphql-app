import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
    query GetUserProfile($userId: ID!) {
        user(id: $userId) {
            posts {
            id
            title
            content
            thumbnail
            authorId
            createdAt
            updatedAt
            }
        }
    }
`