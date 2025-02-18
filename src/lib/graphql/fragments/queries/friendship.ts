import gql from "graphql-tag";

export const GET_FRIENDS = gql`
    query getFriends(
        $userId: String!
    ) {
        friends(userId: $userId) {
            status
        }
    }
`

// Get friendship between two users
export const GET_FRIENDSHIP = gql`
    query getFriendship($fromUserId: String!, $toUserId: String!) {
        friendship(fromUserId: $fromUserId, toUserId: $toUserId) {
            id
            status
        }
    }
`