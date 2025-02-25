'use client'

import { Button, ListItem, Typography, Avatar, Stack } from "@mui/material"
import Link from "next/link"
import { useMutation } from "@apollo/client"
import { UPDATE_NOTIFICATION_READ_STATUS_MUTATION } from "@/lib/graphql/fragments/mutations/notification"
import { GET_USER_NOTIFICATIONS } from "@/lib/graphql/fragments/queries/notification"
import { brand, gray } from "../common/themePrimitives"
import { NotificationType } from "@/types/notification"

type CommonNotificationProps = {
    notification: NotificationType,
    wasRead?: boolean
}

export default function CommonNotification({ notification, wasRead }: CommonNotificationProps) {

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

    const handleMarkNofiticationAsRead = async () => {
        await updateNotificationReadStatus({
            variables: {
                notificationId: notification.id
            }
        })
    }

    return (
        <ListItem
            sx={{
                border: '1px solid',
                borderColor: gray[700],
                borderRadius: '1rem',
                mb: 2
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
                    <Avatar
                        alt={notificationActor.name || 'User'}
                        src={notificationActor?.image}
                        sx={{
                            cursor: 'pointer',
                            height: '40px',
                            width: '40px'
                        }}
                    />
                    <Stack direction="column" justifyContent="center">
                        <Link href={`/users/${notificationActor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6" sx={{
                                transition: '100ms',
                                '&:hover': {
                                    color: brand[300]
                                }
                            }}>{notificationActor.name}</Typography>
                        </Link>
                        <Typography variant="body2">{notification.content}</Typography>
                    </Stack>
                </Stack>
                {
                    !wasRead ?
                        (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleMarkNofiticationAsRead}
                            >
                                Mark as read
                            </Button>
                        ) : null
                }
            </Stack>
        </ListItem>
    )
}