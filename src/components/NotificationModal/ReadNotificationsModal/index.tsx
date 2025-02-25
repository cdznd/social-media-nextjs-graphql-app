'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
    List,
    Box,
    Modal,
    Typography,
    IconButton,
    Stack,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { gray } from '../../common/themePrimitives';
import { GET_READ_USER_NOTIFICATIONS } from '@/fragments/queries/notification';
import EmptyNotifications from '../EmptyNotifications';
import CommonNotification from '../../CommonNotification';
import { NotificationType } from '@/types/notification';

interface ReadNotificationModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ReadNotificationModal(
    { open, onClose }: ReadNotificationModalProps) {

    const { data: session } = useSession();
    const loggedUserId = session?.user?.id

    const { data, loading, error, refetch } = useQuery(GET_READ_USER_NOTIFICATIONS, {
        variables: {
            userId: loggedUserId
        },
        skip: !loggedUserId
    })
    const userNotifications = data?.readNotifications ?? []

    useEffect(() => {
        if (open === true) {
            refetch()
        }
    }, [open])

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
                            <Stack 
                                direction="row" 
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
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
                            { emptyNotifications && <EmptyNotifications /> }
                        </>
                    ) : <Stack direction="row" alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                }
            </Box>
        </Modal>
    );
}
