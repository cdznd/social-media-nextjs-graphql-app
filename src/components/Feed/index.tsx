import dynamic from 'next/dynamic';
import { Alert, Box } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedNewPost from '../FeedNewPost';
import PaginationComponent from '@/components/PaginationComponent';
import { FeedProps } from '@/types/feed';

const DefaultFeed = dynamic(() => import('./FeedType/DefaultFeed'))
const GridFeed = dynamic(() => import('./FeedType/GridFeed'))
const ExploreFeed = dynamic(() => import('./FeedType/ExploreFeed'))

/**
 * Observation: on this page I'm using a Suspense component.
 * It works fine and will work separately from the loading 
 * Suspense bondary defined on the folder
 */
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
    switch (feedType) {
      case 'grid':
        return GridFeed
      case 'explore':
        return ExploreFeed
      default:
        return DefaultFeed
    }
  })()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FeedHeader numberOfPosts={numberOfPosts} feedType={feedType} />
      {
        (feedType === 'private') && (
          <FeedNewPost />
        )
      }
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
