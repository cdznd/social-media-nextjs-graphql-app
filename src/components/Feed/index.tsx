import { Alert, Box } from '@mui/material';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedPagination from '@/components/Feed/FeedPagination';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import DefaultFeed from './FeedType/DefaultFeed';
import GridFeed from './FeedType/GridFeed';
import ExploreFeed from './FeedType/ExploreFeed';
import { FeedProps } from '@/types/feed';

export default function Feed(
  {
    feedData,
    feedType,
    totalPages,
    numberOfPosts
  }: FeedProps
) {
  const hasPosts = feedData.length > 0
  const FeedContentComponent = (() => {
    switch(feedType) {
      case 'grid':
        return GridFeed
      case 'explore':
        return ExploreFeed
      default:
        return DefaultFeed
    }
  })()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4}}>
      <FeedHeader numberOfPosts={numberOfPosts} feedType={feedType} />
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
