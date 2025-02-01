import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import FeedPost from '../FeedPost';
import { Container } from '@mui/material';

export default function FeedContent({ data }: { data: any }) {

    const posts = data?.posts

    if (posts.lenght <= 0) {
        return <h1>No data to display</h1>
    }

    console.log('data inside feedcontent', posts)
    console.log(posts[0])

    return (
        <Box
            sx={{
                maxWidth: '700px',
                marginX: 'auto'
            }}
        >
            {posts.map((post: any) => {
                return (
                    <FeedPost cardData={post} />
                )
            })}
        </Box>
    )
}



{/* <Grid container spacing={2} columns={12}>
    <Grid size={{ xs: 12, md: 8 }}>
        {posts[0] ? <FeedPost cardData={posts[0]} /> : <></>}
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
        >
            {posts[1] ? <FeedPost cardData={posts[1]} variation={'no-media'} /> : []}
            {posts[2] ? <FeedPost cardData={posts[2]} variation={'no-media'} /> : []}
        </Box>
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
        {posts[3] ? <FeedPost cardData={posts[3]} variation={'small'} /> : <></>}
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
        {posts[4] ? <FeedPost cardData={posts[4]} variation={'small'} /> : <></>}
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
        {posts[5] ? <FeedPost cardData={posts[5]} /> : <></>}
    </Grid>
</Grid> */}
{/* <hr />
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FeedPost cardData={cardData[0]} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FeedPost cardData={cardData[1]} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FeedPost cardData={cardData[2]} variation={'small'} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
                    >
                        <FeedPost cardData={cardData[3]} variation={'no-media'} />
                        <FeedPost cardData={cardData[4]} variation={'no-media'} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FeedPost cardData={cardData[5]} variation={'small'} />
                </Grid>
            </Grid> */}