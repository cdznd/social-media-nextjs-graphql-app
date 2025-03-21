'use client'

import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ModalContainer from "../ModalContainer";
import ModalHeader from "../ModalHeader";
import UserProfileUpdateForm from "../UserProfileUpdateForm";
import { UserType } from "@/types/user";

type UserProfileUpdateButtonProps = {
    currentUser: UserType
}

export default function UserProfileUpdateButton(
    { currentUser }: UserProfileUpdateButtonProps
) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    return (
        <>
            <IconButton
                onClick={handleOpen}
            >
                <EditIcon />
            </IconButton>
            <ModalContainer
                open={open}
                onClose={handleClose}
            >
                <ModalHeader
                    title='Update profile info'
                    onClose={handleClose}
                />
                <UserProfileUpdateForm
                    closeModal={handleClose}
                    currentUser={currentUser}
                />
            </ModalContainer>
        </>
    );

}