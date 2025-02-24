'use client'

import { useMutation } from "@apollo/client"
import Link from "next/link"
import { Button, ListItem, Typography, Avatar, Stack } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { GET_USER_NOTIFICATIONS } from "@/lib/graphql/fragments/queries/notification"
import { UPDATE_FRIENDSHIP_STATUS_MUTATION } from "@/lib/graphql/fragments/mutations/friendship"
import { UPDATE_NOTIFICATION_READ_STATUS_MUTATION } from "@/lib/graphql/fragments/mutations/notification"
import { NotificationType } from "@/types/notification"
import { UserType } from "@/types/user"
import { gray, brand } from "../common/themePrimitives"

type FriendshipNotificationProps = {
    notification: NotificationType
}

export default function FriendshipNotification({ notification }: FriendshipNotificationProps) {
    // Checking if it's a friend_request notification
    if (notification.type !== 'FRIEND_REQUEST') return null
    // The person who sent the friend request
    const actor: UserType = notification?.actor
    const userId: string = notification.userId

    const [updateFriendshipStatus] = useMutation(UPDATE_FRIENDSHIP_STATUS_MUTATION)

    const [updateNotificationReadStatus] = useMutation(
        UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
        {
            refetchQueries: [
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { userId }
                }
            ]
        }
    )

    const handleAcceptFriendship = async () => {
        try {
            await updateFriendshipStatus({
                variables: {
                    friendshipId: notification.entityId,
                    status: 'ACCEPTED'
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

    const handleDeclineFriendship = async () => {
        try {
            await updateFriendshipStatus({
                variables: {
                    friendshipId: notification.entityId,
                    status: 'DECLINED'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ListItem
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid',
                borderColor: gray[700],
                borderRadius: '1rem',
                mb: 2
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                    alt={actor.name || 'User'}
                    src={actor?.image}
                    onClick={() => { }}
                    sx={{
                        cursor: 'pointer',
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
                    endIcon={<CheckIcon />}
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeclineFriendship}
                    endIcon={<CloseIcon />}    
                >
                    Decline
                </Button>
            </Stack>
        </ListItem>
    )
}