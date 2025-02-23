import Box from '@mui/material/Box';

import FeedHeader from '@/components/Feed/FeedHeader';
import FeedPagination from '@/components/Feed/FeedPagination';

import { FeedProps } from '@/types/feed';
import { Alert } from '@mui/material';

import BedtimeIcon from '@mui/icons-material/Bedtime';

import DefaultFeed from './FeedType/DefaultFeed';
import GridFeed from './FeedType/GridFeed';

export default function Feed(
  {
    feedData,
    feedType,
    totalPages
  }: FeedProps
) {

  const hasPosts = feedData.length > 0

  const FeedContentComponent = (() => {
    switch(feedType) {
      case 'grid':
        return GridFeed
      default:
        return DefaultFeed
    }
  })()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      {
        hasPosts ? 
          <FeedContentComponent posts={feedData} />
          : <Alert icon={<BedtimeIcon fontSize="inherit" />}>
              No Posts found
            </Alert>
      }
      <FeedPagination totalPages={totalPages} />
    </Box>
  );
}
