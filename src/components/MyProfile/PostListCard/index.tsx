import { Card, Typography, Box, Alert } from "@mui/material";
import PostCard from "@/components/PostCard";

type PostListCardProps = {
    title: String,
    posts: any[],
}

export default function PostListCard({ title, posts }: PostListCardProps) {
    const renderPosts =
        posts.map((post, key) => {
            return <PostCard postData={post} key={key} />
        })
    return (
        <Card
            sx={{
                p: 3,
                textAlign: "center",
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                boxShadow: 3,
                borderRadius: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    {title}
                </Typography>
            </Box>
            {posts.length > 0 ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 2,
                    }}
                >
                    {renderPosts}
                </Box>
            ) : <Alert severity="info">No Posts to display</Alert>}
        </Card>
    );
};
