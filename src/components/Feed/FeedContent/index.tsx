import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import FeedPost from '../FeedPost';
import { Container } from '@mui/material';

export default function FeedContent({ data }: { data: any }) {

    const posts = data?.posts

    if (posts.lenght <= 0) {
        return <h1>No data to display</h1>
    }

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
