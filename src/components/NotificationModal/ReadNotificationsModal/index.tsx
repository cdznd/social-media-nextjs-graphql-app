'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
    List,
    Box,
    Modal,
    Typography,
    Stack,
    CircularProgress
} from '@mui/material';

import { gray } from '../../common/themePrimitives';
import { GET_READ_USER_NOTIFICATIONS } from '@/fragments/queries/notification';
import EmptyNotifications from '../EmptyNotifications';
import CommonNotification from '../../CommonNotification';
import { NotificationType } from '@/types/notification';
import { NotificationModalProps } from '@/types/notification';

import ModalHeader from '../ModalHeader';

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

    // Split notifications between friend requests and common notifications
    const orderedNotifications = userNotifications.reduce((acc: {
        friendshipNotifications: NotificationType[],
        commonNotifications: NotificationType[]
    }, current: NotificationType) => {
        if (current.type === 'FRIEND_REQUEST') {
            acc.friendshipNotifications?.push(current)
        } else {
            acc.commonNotifications?.push(current)
        }
        return acc
    }, {
        friendshipNotifications: [],
        commonNotifications: []
    })

    const emptyNotifications = orderedNotifications.commonNotifications.length === 0

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="notifications-modal"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                maxHeight: '60%',
                overflowY: 'scroll',
                backgroundColor: 'background.paper',
                boxShadow: 24,
                borderRadius: 2,
                paddingY: 3,
                paddingX: 4
            }}>
                {
                    (!error && !loading) ? (
                        <>
                            <ModalHeader
                                title='Marked as Read'
                                onClose={onClose}
                            />
                            {
                                orderedNotifications.commonNotifications.length > 0 && (
                                    <Box sx={{
                                        border: '1px solid',
                                        borderColor: gray[600],
                                        borderRadius: 2,
                                        p: 2,
                                        mb: 2
                                    }}>
                                        <List sx={{
                                            p: 0,
                                        }}>
                                            {orderedNotifications.commonNotifications.length > 0 ? (
                                                orderedNotifications.commonNotifications.map((notification: NotificationType) => (
                                                    <CommonNotification key={notification.id} notification={notification} wasRead={true} />
                                                ))
                                            ) : (
                                                <Typography color="text.secondary" align="center" py={2}>
                                                    No userNotifications yet
                                                </Typography>
                                            )}
                                        </List>
                                    </Box>
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
            </Box>
        </Modal>
    );
}
