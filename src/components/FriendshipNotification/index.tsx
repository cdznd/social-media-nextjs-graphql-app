'use client'

import { useMutation } from "@apollo/client"
import { Box, Button, ListItem, Typography, Avatar } from "@mui/material"
import { UPDATE_FRIENDSHIP_STATUS_MUTATION } from "@/lib/graphql/fragments/mutations/friendship"

export default function FriendshipNotification({ notification }: any) {

    // Checking if it's a friend_request notification
    if (notification.type !== 'FRIEND_REQUEST') return null

    // The person who sent the friend request
    const actor = notification?.actor

    const [updateFriendshipStatus, { loading, error }] = useMutation(UPDATE_FRIENDSHIP_STATUS_MUTATION)

    const handleAcceptFriendship = async () => {
        try {
            await updateFriendshipStatus({
                variables: {
                    friendshipId: notification.entityId,
                    status: 'ACCEPTED'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeclineFriendship = async () => {
        try {
            await updateFriendshipStatus({
                variables: {
                    friendshipId: notification.entityId,
                    status: 'DECLINED'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

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
                <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={handleAcceptFriendship}>Accept</Button>
                <Button variant="contained" color="error" onClick={handleDeclineFriendship}>Decline</Button>
            </Box>
        </ListItem>
    )
}