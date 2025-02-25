import { Card, Typography, Box, Alert } from "@mui/material";
import PostCard from "@/components/PostCard";
import { PostType } from "@/types/post";
import { Stack } from "@mui/system";

type PostListCardProps = {
    title: String,
    posts: PostType[],
}

export default function PostListCard({ title, posts }: PostListCardProps) {

    const renderPosts =
        posts.map((post, key) => {
            return <PostCard
                key={post.id}
                postData={post}
                variants={['no-author']} />
        })

    const emptyPostList = posts.length === 0

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                textAlign: "center",
                p: 3,
                mb: 4,
                boxShadow: 3,
                borderRadius: 2
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}>
                <Typography variant="h5">
                    {title}
                </Typography>
            </Stack>
            {
                emptyPostList ?
                    <Alert severity="info">No liked posts to display</Alert> :
                    (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: 2,
                            }}
                        >
                            {renderPosts}
                        </Box>
                    )
            }
        </Card>
    );
};
