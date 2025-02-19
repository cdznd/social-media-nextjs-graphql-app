'use client'

import { Box, Button, ListItem, ListItemText, Avatar } from "@mui/material"

export default function FriendshipNotification({ notification }: any) {

    console.log('Inside FriendshipNotification', notification);

    const actor = notification?.actor

    return (
        <ListItem
            key={notification.id}
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
                    onClick={() => {}}
                    sx={{ 
                        cursor: 'pointer',
                        height: '80px',
                        width: '80px'
                    }}
                />
                <ListItemText
                    primary={notification.type}
                    secondary={notification.content}
                />
            </Box>
            <Box>
                <Button variant="contained" color="success" sx={{ mb: 1 }}>Accept</Button>
                <Button variant="contained" color="error">Decline</Button>
            </Box>
        </ListItem>
    )
}