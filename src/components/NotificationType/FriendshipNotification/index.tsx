'use client'

import { Button, Stack } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import NotificationUserCard from "../../NotificationUserCard"
import NotificationLayout from "../../NotificationLayout";
import { updateFriendshipStatus } from './actions'
import { GET_USER_NOTIFICATIONS } from "@/fragments/queries/notification";
import { useApolloClient } from "@apollo/client";
import { NotificationType } from "@/types/notification";

export type FriendshipNotificationProps = {
    notification: NotificationType
}

export default function FriendshipNotification({ notification }: FriendshipNotificationProps) {

    const client = useApolloClient();

    const handleAcceptFriendship = async () => {
        const result = await updateFriendshipStatus(notification.id, notification.entityId, 'ACCEPTED')
        if(result?.success) {
            client.refetchQueries({ include: [GET_USER_NOTIFICATIONS] })
        }
    }

    const handleDeclineFriendship = async () => {
        const result = await updateFriendshipStatus(notification.id, notification.entityId, 'REJECTED')
        if(result?.success) {
            client.refetchQueries({ include: [GET_USER_NOTIFICATIONS] })
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