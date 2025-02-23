import gql from "graphql-tag"
import { USER_FIELDS, USER_FRIENDS } from "./user"

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