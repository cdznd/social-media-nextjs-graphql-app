'use client'
import { useState, MouseEvent } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from './actions';
import { CommentType } from '@/types/comment';

type PostCommentOptions = {
    comment: CommentType,
    postId: string
}

export default function PostCommentOptions({ comment, postId }: PostCommentOptions) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleMenuOpen = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteComment = async () => {
        await deleteComment(comment.id, postId, comment.user.id)
    }
    return (
        <>
            <Box
                onClick={handleMenuOpen}
                sx={{
                    cursor: 'pointer'
                }}
            >
                <MoreHorizIcon />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                    '&:focus': {
                        outline: 'none'
                    }
                }}
            >
                <MenuItem>
                    <Button
                        onClick={handleDeleteComment}
                        size="small"
                        variant="contained"
                        fullWidth
                        endIcon={<DeleteIcon />}
                        sx={{
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                    >
                        Delete Comment
                    </Button>
                </MenuItem>
            </Menu>
        </>
    )
}