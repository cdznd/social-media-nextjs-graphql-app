import Box from '@mui/material/Box';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';

import { FeedProps } from '@/types/feed';

export default async function Feed({ feedData, feedType }: FeedProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box>
          {
            feedData.length > 0 ? (<FeedContent posts={feedData} />) : <h1>no posts found</h1>
          }
        </Box>
      </Box>
      {/* <ErrorAlert message={`${feedError}`} /> */}
    </Box>
  );
}
