import gql from "graphql-tag";

import { POST_FIELDS } from "./post";

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            email
            image
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

export const USER_FIELDS = gql`
    fragment UserFields on User {
        id
        email
        name
        image
        username
    }
`

export const USER_FRIENDS = gql`
    fragment UserFriends on User {
        friends {
            user {
                ...UserFields
            }
            status
        }   
    }
    ${USER_FIELDS}
`

export const USER_POSTS = gql`
    fragment UserPosts on User {
        posts {
            ...PostFields
        }
    }
    ${POST_FIELDS}
`
