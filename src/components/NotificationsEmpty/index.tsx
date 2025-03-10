import { Stack, Typography } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export default function EmptyNotifications() {
    return (
        <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography color="text.secondary" align="center" py={2} mr={1}>
                No notifications yet
            </Typography>
            <NotificationsOffIcon />
        </Stack>
    )
}