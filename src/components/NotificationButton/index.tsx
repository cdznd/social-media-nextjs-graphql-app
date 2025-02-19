'use client'
import { IconButton } from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationModal from "../NotificationModal";
import { useState } from "react";

export default function NotificationButton() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton
                sx={{
                    width: '2.25rem',
                    height: '2.25rem',
                    '& > svg': {
                        width: '1.2rem',
                        height: '1.2rem'
                    }
                }}
                onClick={handleOpen}
            >
                <NotificationsNoneIcon />
            </IconButton>
            <NotificationModal open={open} onClose={handleClose} />
        </>
    )
}