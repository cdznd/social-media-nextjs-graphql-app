import gql from "graphql-tag";
import { POST_FIELDS, POST_LIKES } from "./post";

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
            ...PostLikes
        }
    }
    ${POST_FIELDS}
    ${POST_LIKES}
`

export const USER_LIKES = gql`
    fragment UserLikes on User {
        likes {
            post {
                ...PostFields
                ...PostLikes
            }
        }
    }
    ${POST_FIELDS}
    ${POST_LIKES}
`

// Queries
export const GET_ALL_USERS = gql`
    query GetAllUsers($searchString: String, $take: Int, $skip: Int) {
        allUsers(searchString: $searchString, take: $take, skip: $skip) {
            users {
                ...UserFields
            }
            totalCount
            totalPages
        }
    }
    ${USER_FIELDS}
`
