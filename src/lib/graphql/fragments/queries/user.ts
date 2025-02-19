import gql from "graphql-tag";

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            email
        }
    }
`

export const GET_MY_USER_PROFILE = gql`
    query GetUserProfile(
        $userId: String!
    ) {
        user(userId: $userId) {
            email
            name
            image
            friends {
                user {
                    id
                    name
                    email
                }
                status
            }
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

export const GET_USER_PROFILE = gql`
    query GetUserProfile(
        $userId: String!
    ) {
        user(userId: $userId) {
            id
            email
            name
            image
            friends {
                user {
                    id
                    name
                    email
                }
                status
            }
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
        }
    }
` 
