import Link from 'next/link';
import { Stack, Typography } from '@mui/material';
import UserAvatar from '../UserAvatar';
import { NotificationType } from '@/types/notification';
import { brand } from '../common/themePrimitives';

type NotificationUserCardProps = {
    notification: NotificationType
}

export default function NotificationUserCard(
    { notification }: NotificationUserCardProps
) {
    const notificationActor = notification.actor
    return (
        <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={2}
            sx={{
                flex: 1
            }}
        >
            <UserAvatar
                userImage={notificationActor?.image}
                size={{
                    height: 65,
                    width: 65
                }}
            />
            <Stack direction="column" justifyContent="center">
                <Link
                    href={`/users/${notificationActor?.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{
                            '&:hover': {
                                color: brand[400],
                            }
                        }}>
                        {notificationActor?.name}
                    </Typography>
                </Link>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {notification.content}
                </Typography>
            </Stack>
        </Stack>
    )
}