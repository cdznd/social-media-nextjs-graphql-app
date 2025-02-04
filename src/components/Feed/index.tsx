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
      <FeedContent posts={feedData} />
      {/* <ErrorAlert message={`${feedError}`} /> */}
    </Box>
  );
}
