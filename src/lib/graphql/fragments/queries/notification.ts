import gql from "graphql-tag";

export const GET_USER_NOTIFICATIONS = gql`
    query getUserNotifications($userId: String!) {
        notifications(userId: $userId) {
            id
            type
            content
            userId
            actorId
            entityId
            entityType
        }
    }
`