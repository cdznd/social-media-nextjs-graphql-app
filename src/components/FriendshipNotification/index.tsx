'use client'

import { useMutation } from "@apollo/client"
import Link from "next/link"
import { Button, ListItem, Typography, Avatar, Stack } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { GET_USER_NOTIFICATIONS } from "@/fragments/queries/notification"
import { UPDATE_FRIENDSHIP_STATUS_MUTATION } from "@/fragments/mutations/friendship"
import { UPDATE_NOTIFICATION_READ_STATUS_MUTATION } from "@/fragments/mutations/notification"
import { NotificationType } from "@/types/notification"
import { UserType } from "@/types/user"
import { gray, brand } from "../common/themePrimitives"

type FriendshipNotificationProps = {
    notification: NotificationType
}

export default function FriendshipNotification({ notification }: FriendshipNotificationProps) {
    // The person who sent the friend request
    const actor: UserType = notification?.actor
    const userId: string = notification.userId

    // Using updateFriendshipStatus mutation
    const [updateFriendshipStatus] = useMutation(
        UPDATE_FRIENDSHIP_STATUS_MUTATION
    )

    const [updateNotificationReadStatus] = useMutation(
        UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
        {
            refetchQueries: [ // After update the notification re-fetch
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { userId }
                }
            ]
        }
    )

    const handleAcceptFriendship = async () => {
        try {
            await updateFriendshipStatus({ // OBS, every update on friendship status, creates a notification on the backend
                variables: {
                    friendshipId: notification.entityId, // EntityId from the notification
                    status: 'ACCEPTED'
                }
            })
            // Updating current notification to not display it anymore
            await updateNotificationReadStatus({
                variables: {
                    notificationId: notification.id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeclineFriendship = async () => {
        try {
            await updateFriendshipStatus({
                variables: {
                    friendshipId: notification.entityId,
                    status: 'REJECTED'
                }
            })
            await updateNotificationReadStatus({
                variables: {
                    notificationId: notification.id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ListItem
            sx={{
                border: '1px solid',
                borderColor: gray[600],
                borderRadius: '1rem',
                mb: 2
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    width: 1
                }}    
            >
                <Avatar
                    alt={actor.name || 'User'}
                    src={actor?.image}
                    onClick={() => { }}
                    sx={{
                        height: '80px',
                        width: '80px'
                    }}
                />
                <Stack direction="column" justifyContent="center">
                    <Link href={`/users/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" sx={{
                            transition: '100ms',
                            '&:hover': {
                                color: brand[300]
                            }
                        }}>{actor.name}</Typography>
                    </Link>
                    <Typography variant="body2">Sent you a friend request</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAcceptFriendship}
                    endIcon={<CheckIcon sx={{ ml: 0 }}/>}
                    sx={{ width: '80px', p:1, '& .MuiButton-icon': { ml: 0 } }}
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeclineFriendship}
                    endIcon={<CloseIcon />}
                    sx={{ width: '80px', p:1, '& .MuiButton-icon': { ml: 0 } }}
                >
                    Decline
                </Button>
            </Stack>
        </ListItem>
    )
}