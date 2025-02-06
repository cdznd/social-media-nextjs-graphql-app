import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
    query GetUserProfile($userId: ID!) {
        user(id: $userId) {
            email
            name
            image
            posts {
                id
                title
                thumbnail
                authorId
                createdAt
                updatedAt
                author {
                    id
                    name
                }
            }
            likes {
                post {
                    id
                    title
                    thumbnail
                    authorId
                    createdAt
                    updatedAt
                    author {
                        id
                        name
                    }
                }
            }
        }
    }
`