import { FeedTypeProps } from "@/types/feed"
import { PostType } from "@/types/post"
import PostCard from "@/components/PostCard"
import { Container, Box } from "@mui/material"

export default function DefaultFeed({ posts }: FeedTypeProps) {
    const renderPosts = posts.map((post: PostType) => {
        return (
            <Box sx={{ mb: 8 }} key={post.id}>
                <PostCard
                    key={post.id}
                    postData={post} />
            </Box>
        )
    })
    return (
        <Container
            sx={{
                maxWidth: { xs: "100%", sm: "80%", md: "900px" },
            }}
        >
            {renderPosts}
        </Container>
    )
}