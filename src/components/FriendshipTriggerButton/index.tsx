'use client'

import { useState } from "react"
import { Button, Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useMutation, useQuery } from "@apollo/client"
import {
    CREATE_FRIENDSHIP_REQUEST_MUTATION,
    DELETE_FRIENDSHIP_MUTATION
} from "@/fragments/mutations/friendship"
import { useSession } from "next-auth/react"
import { GET_FRIENDSHIP } from "@/fragments/queries/friendship"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function FriendshipTriggerButton(
    { toUserId }: { toUserId: string }
) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const session = useSession()
    const loggedUser = session?.data?.user

    // Try to find a friendship between the logged user and the other user
    const { data: friendshipData, loading: queryLoading } = useQuery(GET_FRIENDSHIP, {
        variables: {
            fromUserId: loggedUser?.id,
            toUserId
        },
        skip: !loggedUser?.id || !toUserId
    })

    const currentFriendship = friendshipData?.friendship
    const friendshipStatus = currentFriendship?.status || null
    const friendshipUserActorId = currentFriendship?.userA.id // The user who sent the request
    // If it's still pending display the option to delete to the actor
    const displayOptionToActor
        = friendshipUserActorId === loggedUser?.id

    // Using the createFriendshipRequest mutation
    const [triggerFriendship, { loading: mutationLoading }] = useMutation(
        CREATE_FRIENDSHIP_REQUEST_MUTATION,
        {
            refetchQueries: [
                {
                    query: GET_FRIENDSHIP,
                    variables: { fromUserId: loggedUser?.id, toUserId }
                }
            ]
        }
    )

    const [deleteFriendship] = useMutation(DELETE_FRIENDSHIP_MUTATION, {
        refetchQueries: [
            {
                query: GET_FRIENDSHIP,
                variables: { fromUserId: loggedUser?.id, toUserId }
            }
        ]
    })

    const sendFriendRequest = async () => {
        await triggerFriendship({
            variables: {
                fromUserId: loggedUser?.id,
                toUserId
            }
        })
    }

    const handleRemoveFriend = async () => {
        if (!currentFriendship?.id) return;
        await deleteFriendship({
            variables: {
                friendshipId: currentFriendship.id
            }
        });
        handleClose();
    }

    const getButtonConfig = () => {
        switch (friendshipStatus) {
            case 'PENDING':
                return {
                    variant: 'outlined' as const,
                    color: 'primary' as const,
                    text: 'Pending Approval',
                    disabled: true,
                    showOptions: true && displayOptionToActor,
                }
            case 'ACCEPTED':
                return {
                    variant: 'contained' as const,
                    color: 'success' as const,
                    text: 'Friends',
                    disabled: true,
                    showOptions: true
                }
            default:
                return {
                    variant: 'contained' as const,
                    color: 'primary' as const,
                    text: 'Add Friend',
                    disabled: false,
                    showOptions: false
                }
        }
    }

    const buttonConfig = getButtonConfig()

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 1 }}>
            <Button
                variant={buttonConfig.variant}
                color={buttonConfig.color}
                onClick={sendFriendRequest}
                disabled={buttonConfig.disabled || queryLoading || mutationLoading}
                size="small"
            >
                {buttonConfig.text}
            </Button>
            {buttonConfig.showOptions && (
                <>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 1 }}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleRemoveFriend} sx={{ color: 'error.main' }}>
                            Remove friend
                        </MenuItem>
                    </Menu>
                </>
            )}
        </Box>
    )
}