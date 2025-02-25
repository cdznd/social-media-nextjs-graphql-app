import gql from "graphql-tag";
import { USER_FIELDS } from "./user";

const NOTIFICATION_FIELDS = gql`
    fragment NotificationFields on Notification {
            id
            type
            content
            userId
            actorId
            actor {
                ...UserFields
            }
            entityId
            entityType
            read
            createdAt
            updatedAt
    }
    ${USER_FIELDS}
`

// Queries
export const GET_USER_NOTIFICATIONS = gql`
    query getUserNotifications($userId: String!) {
        notifications(userId: $userId) {
            ...NotificationFields
        }
    }
    ${NOTIFICATION_FIELDS}
`

export const GET_READ_USER_NOTIFICATIONS = gql`
    query getReadUserNotifications($userId: String!) {
        readNotifications(userId: $userId) {
            ...NotificationFields
        }
    }
    ${NOTIFICATION_FIELDS}
`