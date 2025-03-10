'use client'

import { Button, ListItem, Typography, Stack, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link"
import { useMutation } from "@apollo/client"
import { GET_READ_USER_NOTIFICATIONS } from "@/fragments/queries/notification";
import {
    UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
    DELETE_NOTIFICATION_MUTATION
} from "@/fragments/mutations/notification"
import { GET_USER_NOTIFICATIONS } from "@/fragments/queries/notification"
import { brand, gray } from "../common/themePrimitives"
import { NotificationType } from "@/types/notification"

import UserAvatar from "../UserAvatar";

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
        <ListItem
            sx={{
                border: '1px solid',
                borderColor: gray[400],
                borderRadius: 2,
                backgroundColor: 'background.default',
                mb: 2,
                p: 2,
                '&:last-child': {
                    mb: 0
                }
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: 1
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <UserAvatar
                        userImage={notificationActor?.image}
                        size={{
                            height: 65,
                            width: 65
                        }}
                    />
                    <Stack direction="column" justifyContent="center">
                        <Link
                            href={`/users/${notificationActor?.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                sx={{
                                    '&:hover': {
                                        color: brand[400],
                                    }
                                }}>
                                {notificationActor?.name}
                            </Typography>
                        </Link>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {notification.content}
                        </Typography>
                    </Stack>
                </Stack>
                {
                    !wasRead ?
                        (
                            <Button
                                aria-label="read"
                                variant="contained"
                                onClick={handleMarkNofiticationAsRead}
                                sx={{ width: '150px' }}
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
        </ListItem>
    )
}