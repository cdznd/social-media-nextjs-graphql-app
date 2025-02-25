import gql from "graphql-tag";
import { POST_FIELDS } from "./post";

// Fragments
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

export const USER_LIKES = gql`
    fragment UserLikes on User {
        likes {
            post {
                ...PostFields
            }
        }
    }
    ${POST_FIELDS}
`

// Queries
export const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            ...UserFields
        }
    }
    ${USER_FIELDS}
`
