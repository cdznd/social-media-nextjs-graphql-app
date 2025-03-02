import { Alert, Box } from '@mui/material';
import FeedHeader from '@/components/Feed/FeedHeader';
import PaginationComponent from '@/components/PaginationComponent';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { FeedProps } from '@/types/feed';
import dynamic from 'next/dynamic';

const DefaultFeed = dynamic(() => import('./FeedType/DefaultFeed'))
const GridFeed = dynamic(() => import('./FeedType/GridFeed'))
const ExploreFeed = dynamic(() => import('./FeedType/ExploreFeed'))

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
      <PaginationComponent
        totalPages={totalPages} />
    </Box>
  );
}
