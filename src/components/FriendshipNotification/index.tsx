'use client'

import { Box, Button, ListItem, Typography, Avatar } from "@mui/material"

export default function FriendshipNotification({ notification }: any) {

    // Checking if it's a friend_request notification
    if (notification.type !== 'FRIEND_REQUEST') return null

    // The person who sent the friend request
    const actor = notification?.actor

    return (
        <ListItem
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid black',
                borderColor: 'divider',
                borderRadius: '1rem',
                marginBottom: '1rem'
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
            }}>
                <Avatar
                    alt={actor.name || 'User'}
                    src={actor?.image}
                    onClick={() => { }}
                    sx={{
                        cursor: 'pointer',
                        height: '80px',
                        width: '80px'
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{actor.name}</Typography>
                    <Typography>Sent you a friend request</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" color="success" sx={{ mr: 1 }}>Accept</Button>
                <Button variant="contained" color="error">Decline</Button>
            </Box>
        </ListItem>
    )
}