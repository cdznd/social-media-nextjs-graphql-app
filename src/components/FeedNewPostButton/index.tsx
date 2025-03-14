'use client'

import { useState } from 'react';
import { Stack, Typography } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { brand } from '../common/themePrimitives';
import ModalContainer from '../ModalContainer';
import ModalHeader from '../ModalHeader';
import PostForm from '../PostForm';

export default function FeedNewPostButton() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Stack
                onClick={handleOpen}
                direction='row'
                alignItems='center'
                justifyContent='start'
                spacing={1}
                sx={{
                    backgroundColor: 'background.default',
                    p: 2,
                    width: 1,
                    borderRadius: 4,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                        borderColor: brand[700]
                    },
                }}
            >
                <Typography color="text.secondary">Click here to create new post</Typography>
                <DriveFileRenameOutlineIcon />
            </Stack>
            <ModalContainer
                open={open}
                onClose={handleClose}>
                <ModalHeader
                    title='Create new post'
                    onClose={handleClose} />
                <PostForm
                    closeModal={handleClose} />
            </ModalContainer>
        </>
    )
}