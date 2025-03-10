'use client'

import { useMutation } from "@apollo/client"
import { Button, Stack } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { GET_USER_NOTIFICATIONS } from "@/fragments/queries/notification"
import { UPDATE_FRIENDSHIP_STATUS_MUTATION } from "@/fragments/mutations/friendship"
import { UPDATE_NOTIFICATION_READ_STATUS_MUTATION } from "@/fragments/mutations/notification"
import { UserType } from "@/types/user"
import { FriendshipNotificationProps } from "@/types/notification"
import NotificationUserCard from "../NotificationUserCard"
import NotificationLayout from "../NotificationLayout";

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
            await updateFriendshipStatus({
                variables: {
                    friendshipId: notification.entityId,
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
        <NotificationLayout>
            <NotificationUserCard
                notification={notification} />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAcceptFriendship}
                    endIcon={<CheckIcon sx={{ ml: 0 }} />}
                    sx={{ width: '80px', p: 1, '& .MuiButton-icon': { ml: 0 } }}
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeclineFriendship}
                    endIcon={<CloseIcon />}
                    sx={{ width: '80px', p: 1, '& .MuiButton-icon': { ml: 0 } }}
                >
                    Decline
                </Button>
            </Stack>
        </NotificationLayout >
    )
}