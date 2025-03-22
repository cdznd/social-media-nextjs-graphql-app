'use client'
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from "./actions";
import { useRouter } from "next/navigation";

export default function PostAuthorActions(
    { userId, postId }: { userId: string, postId: string }
) {
    const router = useRouter()
    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure?')
        if(confirmed) {
            const result = await deletePost(userId, postId)
            console.log('result');
            console.log(result);
            router.back()
        }
    }
    return <>
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <IconButton
                onClick={handleDelete}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        </Stack>
    </>
}