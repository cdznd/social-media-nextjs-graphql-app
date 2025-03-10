'use client'

import { Button, Stack, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from "@apollo/client"
import { GET_READ_USER_NOTIFICATIONS } from "@/fragments/queries/notification";
import {
    UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
    DELETE_NOTIFICATION_MUTATION
} from "@/fragments/mutations/notification"
import { GET_USER_NOTIFICATIONS } from "@/fragments/queries/notification"
import { NotificationType } from "@/types/notification"

import NotificationUserCard from "../NotificationUserCard";
import NotificationLayout from "../NotificationLayout";


type CommonNotificationProps = {
    notification: NotificationType,
    wasRead?: boolean
}

export default function CommonNotification(
    { notification, wasRead }: CommonNotificationProps
) {

    const notificationActor = notification.actor
    const notificationUserId = notification.userId

    const [updateNotificationReadStatus] = useMutation(
        UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
        {
            refetchQueries: [
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { userId: notificationUserId }
                }
            ]
        }
    )

    const [deleteNotification] = useMutation(
        DELETE_NOTIFICATION_MUTATION,
        {
            refetchQueries: [
                {
                    query: GET_READ_USER_NOTIFICATIONS,
                    variables: { userId: notificationUserId }
                }
            ]
        }
    )

    const handleMarkNofiticationAsRead = async () => {
        await updateNotificationReadStatus({
            variables: {
                notificationId: notification.id
            }
        })
    }

    const handleDeleteNotification = async () => {
        await deleteNotification({
            variables: {
                notificationId: notification.id
            }
        })
    }

    return (
        <NotificationLayout>
            <NotificationUserCard
                notification={notification} />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                {
                    !wasRead ?
                        (
                            <Button
                                aria-label="read"
                                variant="contained"
                                onClick={handleMarkNofiticationAsRead}
                                sx={{ ml: 8 }}
                            >
                                Mark as read
                            </Button>
                        ) : (
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteNotification}
                                sx={{ ml: 8 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )
                }
            </Stack>
        </NotificationLayout >
    )
}