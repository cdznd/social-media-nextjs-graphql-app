import gql from "graphql-tag"
import { USER_FIELDS, USER_FRIENDS, USER_POSTS } from "./user"

export const GET_USER_PROFILE = gql`
    query GetUserProfile(
        $userId: String!
    ) {
        user(userId: $userId) {
            ...UserFields
            ...UserFriends
            ...UserPosts
        }
    }
    ${USER_FIELDS}
    ${USER_FRIENDS}
    ${USER_POSTS}
` 