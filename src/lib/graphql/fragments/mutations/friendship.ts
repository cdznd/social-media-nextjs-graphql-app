import gql from "graphql-tag"

export const CREATE_FRIENDSHIP_REQUEST_MUTATION = gql`
    mutation CreateFriendship($fromUserId: String!, $toUserId: String!) {
        createFriendship(fromUserId: $fromUserId, toUserId: $toUserId) {
            id
        }
    }
`

export const UPDATE_FRIENDSHIP_STATUS_MUTATION = gql`
    mutation UpdateFriendshipStatus($friendshipId: String!, $status: String!) {
        updateFriendshipStatus(friendshipId: $friendshipId, status: $status) {
            id
        }
    }
`

export const DELETE_FRIENDSHIP_MUTATION = gql`
    mutation DeleteFriendship($friendshipId: String!) {
        deleteFriendship(friendshipId: $friendshipId) {
            id
        }
    }
`
