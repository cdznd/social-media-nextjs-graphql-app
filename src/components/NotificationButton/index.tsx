'use client'
import { IconButton } from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { useRouter } from "next/navigation";

export default function NotificationButton() {

    const router = useRouter()

    return (
        <IconButton
            sx={{
                width: '2.25rem',
                height: '2.25rem',
                '& > svg': {
                    width: '1.2rem',
                    height: '1.2rem'
                }
            }}
            onClick={() => router.push('app/notifications')}
        >
            <NotificationsNoneIcon />
        </IconButton>
    )
}