import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import FeedPost from '../../PostCard';
import { Container } from '@mui/material';

type FeedContentProps = {
    posts: any
}

export default function FeedContent({ posts }: FeedContentProps) {

    console.log('checking posts', posts)

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
                    <FeedPost postData={post} />
                )
            })}
        </Box>
    )
}
