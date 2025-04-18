'use client'
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { IconButton } from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { GET_USER_NOTIFICATIONS } from "@/fragments/queries/notification";
import { brand } from "../common/themePrimitives";

const NotificationModal = dynamic(() => import('../NotificationModal'))

export default function NotificationButton() {

    const { data: session } = useSession();
    const loggedUserId = session?.user?.id

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Data used to define the icon to display based 
    // on the existense of unread notifications
    const { data } = useQuery(GET_USER_NOTIFICATIONS, {
        variables: {
            userId: loggedUserId
        },
        skip: !loggedUserId
    })
    const userNotifications = data?.notifications ?? []
    const hasNotifications = userNotifications.length > 0

    return (
        <>
            <IconButton
                sx={{
                    width: '2.25rem',
                    height: '2.25rem',
                    '& > svg': {
                        width: '1.2rem',
                        height: '1.2rem'
                    },
                    color: hasNotifications ? brand[300] : null
                }}
                onClick={handleOpen}
            >
                {
                    hasNotifications
                        ? <NotificationsActiveIcon />
                        : <NotificationsNoneIcon />
                }
            </IconButton>
            <NotificationModal open={open} onClose={handleClose} />
        </>
    )
}