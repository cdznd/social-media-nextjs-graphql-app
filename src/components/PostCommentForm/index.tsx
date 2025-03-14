'use client'
import { useActionState } from "react";
import { createComment } from "./actions";
import { Box, TextField, Button, Stack, Typography } from "@mui/material"
import LinearLoading from "../Loading/Linear";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SendIcon from '@mui/icons-material/Send';

const initialState = {
    success: false
}

export default function PostCommentForm(
    { postId, loggedUserId }: { postId: string, loggedUserId: string }
) {
    const currentUserId = loggedUserId
    const createCommentAction = createComment.bind(
        null,
        postId,
        currentUserId,
    );
    const [state, formAction, pending] = useActionState(createCommentAction, initialState)
    return (
        <Box
            component='form'
            action={formAction}
        >
            <TextField
                id="content"
                name="content"
                sx={{
                    width: 1,
                    '& .MuiInputBase-root': {
                        height: 'auto',
                        backgroundColor: 'background.paper'
                    },
                }}
                placeholder="Add a Comment"
                multiline
                minRows={3}
            />
            <Stack
                direction="row"
                justifyContent="end"
                alignItems="center"
                spacing={2}
                sx={{
                    mt: 1
                }}
            >
                {
                    pending && (
                        <Box sx={{ width: 1 }}><LinearLoading /></Box>
                    )
                }
                <Button
                    type="submit"
                    endIcon={pending ? <HourglassTopIcon /> : <SendIcon />}
                    variant="contained"
                    color="secondary"
                    size="small"
                >
                    Send
                </Button>
            </Stack>
        </Box>
    )
}