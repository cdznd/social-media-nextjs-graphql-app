'use client'

import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GET_USER_NOTIFICATIONS } from '@/lib/graphql/fragments/queries/notification';
import { List, Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FriendshipNotification from '../FriendshipNotification';
import CommonNotification from '../CommonNotification';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

interface NotificationModalProps {
    open: boolean;
    onClose: () => void;
}

export default function NotificationModal(
    { open, onClose }: NotificationModalProps) {

    const { data: session } = useSession();

    const { data, loading, error } = useQuery(GET_USER_NOTIFICATIONS, {
        variables: {
            userId: session?.user?.id
        },
        skip: !session?.user?.id
    })

    const notifications = data?.notifications ?? []

    if (loading || error) {
        return null;
    }

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
                {/* Title */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">
                        Notifications
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                {/* List of friends request */}
                {
                    notifications.length > 0 && (
                        <Box sx={{ border: '1px solid #4B5563', p: '1rem', borderRadius: '1rem', background: '#1F2937' }}>
                            <Typography variant="h6" sx={{ marginBottom: '.5rem' }}>
                                Friend Requests
                            </Typography>
                            <List sx={{ p: 0 }}>
                                {notifications.map((notification: any) => (
                                    <FriendshipNotification key={notification.id} notification={notification} />
                                ))}
                            </List>
                        </Box>
                    )
                }
                {
                    notifications.length > 0 && (
                        <Box sx={{ border: '1px solid #4B5563', p: '1rem', borderRadius: '1rem', background: '#1F2937', marginTop: '1rem' }}>
                            <List sx={{ p: 0 }}>
                                {notifications.length > 0 ? (
                                    notifications.map((notification: any) => (
                                        <CommonNotification key={notification.id} notification={notification} />
                                    ))
                                ) : (
                                    <Typography color="text.secondary" align="center" py={2}>
                                        No notifications yet
                                    </Typography>
                                )}
                            </List>
                        </Box>
                    )
                }
                {
                    notifications.length === 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="text.secondary" align="center" py={2} mr={1}>
                                No notifications yet
                            </Typography>
                            <NotificationsOffIcon />
                        </Box>
                    )
                }
            </Box>
        </Modal>
    );
}
