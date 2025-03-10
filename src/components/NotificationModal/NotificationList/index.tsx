import dynamic from 'next/dynamic';
import { Box, Stack, Typography, List } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { gray } from '@/components/common/themePrimitives';
import { NotificationType } from '@/types/notification';

const FriendshipNotification = dynamic(() => import('@/components/NotificationType/FriendshipNotification'));
const CommonNotification = dynamic(() => import('@/components/NotificationType/CommonNotification'));

type NotificationListProps = {
    userNotifications: NotificationType[]
    notificationType: string
    displayHeader: boolean
}

export default function NotificationList(
    { userNotifications, notificationType, displayHeader }: NotificationListProps
) {
    const NotificationComponent = (() => {
        switch (notificationType) {
            case 'FRIEND_REQUEST':
                return FriendshipNotification
            default:
                return CommonNotification
        }
    })()
    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: gray[400],
            borderRadius: 2,
            p: 2,
            mb: 2
        }}>
            {
                displayHeader && (
                    <Stack
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            mb: 1
                        }}
                    >
                        <GroupIcon />
                        <Typography
                            variant="h6"
                            color="text.primary"
                        >
                            Friend Requests
                        </Typography>
                    </Stack>
                )
            }
            <List sx={{ p: 0 }}>
                {
                    userNotifications.map((notification: NotificationType) => (
                        <NotificationComponent
                            key={notification.id}
                            notification={notification} />
                    ))
                }
            </List>
        </Box>
    )
}