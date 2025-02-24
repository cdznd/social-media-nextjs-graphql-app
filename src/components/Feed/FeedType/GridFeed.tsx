import { FeedTypeProps } from "@/types/feed"
import { PostType } from "@/types/post"
import PostCard from "@/components/PostCard"

import { Box, Grid, Typography } from "@mui/material"

export default function GridFeed({ posts }: FeedTypeProps) {
    const renderPosts = posts.map((post: PostType) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                <PostCard
                    key={post.id}
                    postData={post} />
            </Grid>
        )
    })
    return (
        <>
            <Grid container spacing={3} sx={{ py: 4 }}>
                {renderPosts}
            </Grid>
        </>
    )
}