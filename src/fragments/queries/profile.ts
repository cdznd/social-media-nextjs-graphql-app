import gql from "graphql-tag"
import {
    USER_FIELDS,
    USER_FRIENDS,
    USER_POSTS,
    USER_LIKES
} from "./user"

// Queries
export const GET_USER_PROFILE = gql`
    query GetUserProfile(
        $userId: String!
    ) {
        user(userId: $userId) {
            ...UserFields
            ...UserFriends
        }
    }
    ${USER_FIELDS}
    ${USER_FRIENDS}
`

export const GET_MY_USER_PROFILE = gql`
    query GetUserProfile(
        $userId: String!
    ) {
        user(userId: $userId) {
            ...UserFields
            ...UserFriends
            ...UserPosts
            ...UserLikes
        }
    }
    ${USER_FIELDS}
    ${USER_FRIENDS}
    ${USER_POSTS}
    ${USER_LIKES}
`