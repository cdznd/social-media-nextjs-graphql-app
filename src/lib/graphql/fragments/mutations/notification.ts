import gql from "graphql-tag";

export const UPDATE_NOTIFICATION_READ_STATUS_MUTATION = gql`
    mutation UpdateNotificationReadStatus($notificationId: String!) {
        updateNotificationReadStatus(notificationId: $notificationId) {
            id
        }
    }
`

export const DELETE_NOTIFICATION_MUTATION = gql`
    mutation DeleteNotification($notificationId: String!) {
        deleteNotification(notificationId: $notificationId) {
            id
        }
    }
`