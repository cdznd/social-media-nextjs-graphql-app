'use client'
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { List, Box, Modal, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { GET_READ_USER_NOTIFICATIONS } from '@/lib/graphql/fragments/queries/notification';
import CommonNotification from '../../CommonNotification';
import { NotificationType } from '@/types/notification';
import { brand, gray } from '../../common/themePrimitives';

interface ReadNotificationModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ReadNotificationModal(
    { open, onClose }: ReadNotificationModalProps) {

    const { data: session } = useSession();
    const loggedUserId = session?.user?.id
    
    const { data, loading, error } = useQuery(GET_READ_USER_NOTIFICATIONS, {
        variables: {
            userId: loggedUserId
        },
        skip: !loggedUserId
    })

    const userNotifications = data?.readNotifications ?? []

    const orderedNotifications = userNotifications.reduce((acc: {
        friendshipNotifications: any[],
        commonNotifications: any[]
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
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">
                        Marked as read
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                {
                    orderedNotifications.commonNotifications.length > 0 && (
                        <Box sx={{
                            border: '1px solid',
                            borderColor: gray[600],
                            borderRadius: '1rem',
                            p: 2,
                            background: '#1F2937',
                            mb: 2
                        }}>
                            <List sx={{ p: 0 }}>
                                {orderedNotifications.commonNotifications.length > 0 ? (
                                    orderedNotifications.commonNotifications.map((notification: any) => (
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
                {
                    orderedNotifications.commonNotifications.length === 0 && (
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
