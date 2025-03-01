import { FeedTypeProps } from "@/types/feed"
import PostCard from "@/components/PostCard"
import { Grid } from "@mui/material"

export default function ExploreFeed({ posts }: FeedTypeProps) {

    const renderPosts = posts.reduce((acc: JSX.Element[], _, index: number) => {
        if (index % 5 === 0) {
            // Every 5 items, start a new chunk: first row (2 items), second row (3 items)
            const row1 = posts.slice(index, index + 2); // 2 posts
            const row2 = posts.slice(index + 2, index + 5); // 3 posts
            if (row1.length) {
                acc.push(
                    <Grid container item spacing={3} key={`row-2-${index}`}>
                        {row1.map((post) => (
                            <Grid item xs={12} sm={6} key={post.id}>
                                <PostCard postData={post} position={index + 1}/>
                            </Grid>
                        ))}
                    </Grid>
                );
            }
            if (row2.length) {
                acc.push(
                    <Grid container item spacing={3} key={`row-3-${index}`}>
                        {row2.map((post) => (
                            <Grid item xs={12} sm={4} key={post.id}>
                                <PostCard postData={post} position={index + 1}/>
                            </Grid>
                        ))}
                    </Grid>
                );
            }
        }
        return acc;
    }, [])
    return (
        <Grid container spacing={3} sx={{ py: 4, pt: 0 }}>
            {renderPosts}
        </Grid>
    );
}