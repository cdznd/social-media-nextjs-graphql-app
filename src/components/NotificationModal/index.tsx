'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
    List,
    Box,
    Modal,
    Typography,
    IconButton,
    Stack,
    Button,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import RestoreIcon from '@mui/icons-material/Restore';
import { gray } from '../common/themePrimitives';
import { GET_USER_NOTIFICATIONS } from '@/fragments/queries/notification';
import FriendshipNotification from '../FriendshipNotification';
import CommonNotification from '../CommonNotification';
import ReadNotificationModal from './ReadNotificationsModal';
import EmptyNotifications from './EmptyNotifications';
import { NotificationType } from '@/types/notification';
import { NotificationModalProps } from '@/types/notification';

export default function NotificationModal(
    { open, onClose }: NotificationModalProps) {

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
        if(open === true) {
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

    const emptyNotifications =
        orderedNotifications.commonNotifications.length === 0 &&
        orderedNotifications.friendshipNotifications.length === 0

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
                maxHeight: '80%',
                overflowY: 'scroll',
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: '1rem',
                paddingY: '1.5rem',
                paddingX: '2rem'
            }}>
                {
                    (!error && !loading) ? (
                        <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h4">
                                    Notifications
                                </Typography>
                                <IconButton onClick={onClose} size="small">
                                    <CloseIcon />
                                </IconButton>
                            </Stack>

                            {
                                orderedNotifications.friendshipNotifications.length > 0 && (
                                    <Box sx={{
                                        background: gray[700],
                                        border: '1px solid',
                                        borderColor: gray[500],
                                        borderRadius: '1rem',
                                        p: 2,
                                        mb: 2
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="start"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ mb: 1 }}
                                        >
                                            <GroupIcon />
                                            <Typography variant="h6">
                                                Friend Requests
                                            </Typography>
                                        </Stack>
                                        <List sx={{ p: 0 }}>
                                            {userNotifications.map((notification: NotificationType) => (
                                                <FriendshipNotification
                                                    key={notification.id}
                                                    notification={notification} />
                                            ))}
                                        </List>
                                    </Box>
                                )
                            }
                            {
                                orderedNotifications.commonNotifications.length > 0 && (
                                    <Box sx={{
                                        background: gray[700],
                                        border: '1px solid',
                                        borderColor: gray[500],
                                        borderRadius: '1rem',
                                        p: 2,
                                        mb: 2
                                    }}>
                                        <List sx={{ p: 0 }}>
                                            {orderedNotifications.commonNotifications.length > 0 ? (
                                                orderedNotifications.commonNotifications.map((notification: NotificationType) => (
                                                    <CommonNotification key={notification.id} notification={notification} />
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
                            {emptyNotifications && <EmptyNotifications /> }
                            <Button
                                onClick={handleNestedOpen}
                                endIcon={<RestoreIcon />}
                                variant='outlined'
                            >
                                Old notifications
                            </Button>
                            <ReadNotificationModal open={nestedOpen} onClose={handleNestedClose} />
                        </>
                    ) : <Stack direction="row" alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                }
            </Box>
        </Modal>
    );
}
