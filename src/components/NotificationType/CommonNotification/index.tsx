'use client'

import { Button, Stack, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { 
    GET_USER_NOTIFICATIONS,
    GET_READ_USER_NOTIFICATIONS
} from "@/fragments/queries/notification"
import { NotificationType } from "@/types/notification"

import NotificationUserCard from "../../NotificationUserCard";
import NotificationLayout from "../../NotificationLayout";

import { useApolloClient } from "@apollo/client";

import { updateNotificationReadStatus, deleteNotification } from "../actions";

type CommonNotificationProps = {
    notification: NotificationType,
}

export default function CommonNotification(
    { notification }: CommonNotificationProps
) {

    const client = useApolloClient();

    const handleMarkNofiticationAsRead = async () => {
        const result = await updateNotificationReadStatus(notification.id)
        if(result?.success) {
            client.refetchQueries({ include: [GET_USER_NOTIFICATIONS] })
        } else {
            alert('Failed to mark notification as read')
        }
    }

    const handleDeleteNotification = async () => {
        const result = await deleteNotification(notification.id)
        if(result?.success) {
            client.refetchQueries({ include: [GET_READ_USER_NOTIFICATIONS] })
        } else {
            alert('Failed to delete notification')
        }
    }

    return (
        <NotificationLayout>
            <NotificationUserCard
                notification={notification} />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                {
                    !notification?.read ?
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