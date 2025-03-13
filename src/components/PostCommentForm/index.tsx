'use client'
import { useActionState } from "react";
import { Box, TextField, Button, Stack, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

import { createComment } from "./actions";

import { useSession } from "next-auth/react";

import LinearLoading from "../Loading/Linear";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import { useApolloClient } from "@apollo/client";

const initialState = {
    success: false
}


export default function PostCommentForm({ postId }: { postId: string }) {
    const { data: session } = useSession();
    const currentUserId = session?.user?.id ?? ''

    const client = useApolloClient();

    const createCommentAction = createComment.bind(
        null,
        postId,
        currentUserId,
    );

    const [state, formAction, pending] = useActionState(createCommentAction, initialState)

    console.log('state', state);
    console.log('pending', pending);

    // if (state?.success) {
    //     console.log('OKI');
    //     // client.refetchQueries({ include: [] })
    // } else {
    //     // alert('failed to add comment')
    // }

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