import Link from "next/link"
import { Box, Divider, Stack, Typography } from "@mui/material"
import UserAvatar from "../UserAvatar"
import { CommentType } from "@/types/comment"
import { brand } from "../common/themePrimitives"

export default function PostComment({ comment }: { comment: CommentType }) {
    const commentAuthor = comment?.user ?? {}
    const commentCreationDate = new Date(comment?.createdAt)
    const formattedDate = commentCreationDate.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mt: 2
            }}
        >
            <Stack
                direction="row"
                justifyContent="start"
                alignItems="center"
                spacing={1}
            >
                <UserAvatar
                    userImage={commentAuthor?.image}
                    size={{
                        height: 30,
                        width: 30
                    }}
                />
                <Link
                    href={`/users/${commentAuthor.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                            fontWeight: '600',
                            '&:hover': {
                                color: brand[400]
                            }
                        }}>
                        {commentAuthor.name}
                    </Typography>
                </Link>
                <Typography
                    variant="caption"
                    color="text.secondary">
                    {formattedDate}
                </Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Box
                sx={{
                    mt: 1
                }}
            >
                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    {comment.content}
                </Typography>
            </Box>
        </Box>
    )
}