'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
    Stack,
    CircularProgress
} from '@mui/material';

import { GET_READ_USER_NOTIFICATIONS } from '@/fragments/queries/notification';
import EmptyNotifications from '../../NotificationsEmpty';
import { NotificationModalProps } from '@/types/notification';

import ModalContainer from '../../ModalContainer';
import ModalHeader from '../../ModalHeader';
import { orderNotifications } from '../utils';
import NotificationList from '../../NotificationList';

export default function ReadNotificationModal(
    { open, onClose }: NotificationModalProps
) {
    const { data: session } = useSession();
    const loggedUserId = session?.user?.id

    const { data, loading, error, refetch } = useQuery(
        GET_READ_USER_NOTIFICATIONS,
        {
            variables: {
                userId: loggedUserId
            },
            skip: !loggedUserId
        }
    )

    const userNotifications = data?.readNotifications ?? []

    // Everytime the modal in opened refetch the notifications.
    useEffect(() => {
        if (open === true) {
            refetch()
        }
    }, [open, refetch])

    const orderedNotifications = orderNotifications(userNotifications)
    const emptyNotifications = orderedNotifications.commonNotifications.length === 0

    return (
        <ModalContainer
            open={open}
            onClose={onClose}
        >
            <ModalHeader
                title='Marked as Read'
                onClose={onClose}
            />
            {
                (!error && !loading) ? (
                    <>
                        {
                            orderedNotifications.commonNotifications.length > 0 && (
                                <NotificationList
                                    displayHeader={false}
                                    notificationType='COMMON'
                                    userNotifications={orderedNotifications.commonNotifications} />
                            )
                        }
                        {emptyNotifications && <EmptyNotifications />}
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
