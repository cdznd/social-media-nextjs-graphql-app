'use client'

import { Box, Button, ListItem, Typography, Avatar } from "@mui/material"

export default function CommonNotification({ notification }: any) {

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
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1">{notification.content}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" color="success" sx={{ mr: 1 }}>Mark as read</Button>
            </Box>
        </ListItem>
    )
}