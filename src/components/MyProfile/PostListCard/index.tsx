import { Card, Typography, Box, Alert, Grid } from "@mui/material";
import PostCard from "@/components/PostCard";
import { PostType } from "@/types/post";
import { Stack } from "@mui/system";

type PostListCardProps = {
    title: string,
    posts: PostType[],
}

export default function PostListCard({ title, posts }: PostListCardProps) {
    const emptyPostList = posts.length === 0
    const disableUserEngagement = true
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
                borderRadius: 2,
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
            <Box
                sx={{
                    maxHeight: '800px',
                    overflowY: 'scroll'
                }}
            >
                {
                    emptyPostList ?
                        <Alert severity="info">No liked posts to display</Alert> :
                        (
                            <Grid container spacing={3}>
                                {
                                    posts.map(
                                        (post: PostType) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                                                <PostCard
                                                    key={post.id}
                                                    postData={post}
                                                    variants={
                                                        disableUserEngagement ? ['min-info', 'disable-user-engagement'] : ['min-info']
                                                    } />
                                            </Grid>
                                        )
                                    )
                                }
                            </Grid>
                        )
                }
            </Box>
        </Card>
    );
};
