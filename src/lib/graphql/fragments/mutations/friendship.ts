import gql from "graphql-tag"

export const TRIGGER_FRIENDSHIP_REQUEST_MUTATION = gql`
    mutation CreateFriendship($fromUserId: String!, $toUserId: String!) {
        createFriendship(fromUserId: $fromUserId, toUserId: $toUserId) {
            id
        }
    }
`