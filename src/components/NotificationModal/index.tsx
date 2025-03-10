'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
    Stack,
    Button,
    CircularProgress
} from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';

import { GET_USER_NOTIFICATIONS } from '@/fragments/queries/notification'
import ReadNotificationModal from './ReadNotificationsModal';
import EmptyNotifications from './EmptyNotifications';
import { NotificationModalProps } from '@/types/notification';

import ModalContainer from './ModalContainer';
import ModalHeader from './ModalHeader';

import NotificationList from './NotificationList';

import { orderNotifications } from './utils';

export default function NotificationModal(
    { open, onClose }: NotificationModalProps
) {

    const { data: session } = useSession();
    const loggedUserId = session?.user?.id

    const [nestedOpen, setNestedOpen] = useState(false);
    const handleNestedOpen = () => setNestedOpen(true);
    const handleNestedClose = () => setNestedOpen(false);

    const { data, loading, error, refetch } = useQuery(
        GET_USER_NOTIFICATIONS,
        {
            variables: {
                userId: loggedUserId
            },
            skip: !loggedUserId
        }
    )
    const userNotifications = data?.notifications ?? []

    // Everytime the modal in opened refetch the notifications.
    useEffect(() => {
        if (open === true) {
            refetch()
        }
    }, [open, refetch])

    // Split notifications between friend requests and common notifications 
    const orderedNotifications = orderNotifications(userNotifications)
    const emptyNotifications =
        orderedNotifications.commonNotifications.length === 0 &&
        orderedNotifications.friendshipNotifications.length === 0

    return (
        <ModalContainer
            open={open}
            onClose={onClose}
        >
            <ModalHeader
                title='Notifications'
                onClose={onClose}
            />
            {
                (!error && !loading) ? (
                    <>
                        {
                            orderedNotifications.friendshipNotifications.length > 0 && (
                                <NotificationList
                                    displayHeader={true}
                                    notificationType='FRIEND_REQUEST'
                                    userNotifications={orderedNotifications.friendshipNotifications} />
                            )
                        }
                        {
                            orderedNotifications.commonNotifications.length > 0 && (
                                <NotificationList
                                    displayHeader={false}
                                    notificationType='COMMON'
                                    userNotifications={orderedNotifications.commonNotifications} />
                            )
                        }
                        {emptyNotifications && <EmptyNotifications />}
                        <Button
                            onClick={handleNestedOpen}
                            endIcon={<RestoreIcon />}
                            variant='outlined'
                        >
                            Old notifications
                        </Button>
                        <ReadNotificationModal open={nestedOpen} onClose={handleNestedClose} />
                    </>
                ) : (
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                )
            }
        </ModalContainer>
    );
}
