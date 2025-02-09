import Box from '@mui/material/Box';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';

type FeedProps = {
  feedData: any
}

export default async function Feed({ feedData }: FeedProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      {
        feedData.length > 0 ? (<FeedContent posts={feedData} />) : <h1>no posts found</h1>
      }
      {/* <ErrorAlert message={`${feedError}`} /> */}
    </Box>
  );
}
