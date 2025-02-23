import Box from '@mui/material/Box';

import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';
import FeedPagination from '@/components/Feed/FeedPagination';

import { FeedProps } from '@/types/feed';
import { PostType } from '@/types/post';

export default function Feed(
  {
    feedData,
    feedType,
    totalPages
  }: FeedProps
) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      {
        feedData.length > 0 ? 
          <FeedContent posts={feedData} /> : <h1>no posts found</h1>
      }
      <FeedPagination totalPages={totalPages} />
    </Box>
  );
}
