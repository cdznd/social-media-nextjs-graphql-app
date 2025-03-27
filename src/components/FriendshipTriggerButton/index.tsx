'use client'

import { useState, useActionState, useTransition } from "react"
import { Button, Box, IconButton, Menu, MenuItem } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {
    triggerFriendship,
    deleteFriendship
} from "./actions"
import LinearLoading from "../Loading/Linear";
import { FriendshipType } from "@/types/friendship";

type FriendshipTriggerButtonProps = {
    friendshipData: FriendshipType,
    loggedUserId: string,
    userId: string
}

export default function FriendshipTriggerButton(
    { friendshipData, loggedUserId, userId }: FriendshipTriggerButtonProps
) {
    // anchor
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentFriendship = friendshipData
    const friendshipStatus = currentFriendship?.status ?? null
    // The user who sent the request
    const friendshipUserActorId = currentFriendship?.userA.id ?? null
    // If it's still pending display the option to delete to the actor
    const displayOptionToActor
        = friendshipUserActorId === loggedUserId

    // ACTION SERVER calls
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition()
    // useActionState to track the triggerFriendship action
    const [triggerState, actionTriggerFriendship, isPendingTriggerFriendship] = useActionState(
        triggerFriendship,
        {
            success: false,
            message: ''
        }
    )
    // useActionState to track the deleteFriendship action
    const [deleteState, actionDeleteFriendship, isPendingDeleteFriendship] = useActionState(
        deleteFriendship,
        {
            success: false,
            message: ''
        }
    )

    const sendFriendRequest = async () => {
        startTransition(() => {
            actionTriggerFriendship({
                fromUserId: loggedUserId,
                toUserId: userId
            })
        })
    }

    const handleRemoveFriend = async () => {
        if (!currentFriendship?.id) return;
        startTransition(() => {
            actionDeleteFriendship({ friendshipId: currentFriendship.id });
        })
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
            case 'REJECTED':
                return {
                    variant: 'outlined' as const,
                    color: 'primary' as const,
                    text: 'Rejected',
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
                disabled={buttonConfig.disabled}
                size="small"
                endIcon={
                    (isPendingTriggerFriendship && !triggerState.success) ? <HourglassTopIcon /> : null}
            >
                {buttonConfig.text}
            </Button>
            {buttonConfig.showOptions && (
                (isPendingDeleteFriendship && !deleteState.success) ? (
                    <Box sx={{ width: 1 }}>
                        <LinearLoading />
                    </Box>
                ) : (
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
                )
            )}
        </Box>
    )
}