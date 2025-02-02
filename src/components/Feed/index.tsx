import Box from '@mui/material/Box';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';

import createApolloClient from "@/lib/apolloClient";
import { GET_FEED_POSTS } from '@/graphql/mutations';
import ErrorAlert from '../ErrorAlert';

async function getServerSideProps() {
  const apolloClient = createApolloClient()
  try {
    const { data: feedData } = await apolloClient.query({
      query: GET_FEED_POSTS
    })
    return { feedData, feedError: null }
  } catch (error) {
    return { feedData: null, feedError: error }
  }
}

export default async function Feed() {
  const { feedData, feedError } = await getServerSideProps()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      {
        !feedError ?
          <FeedContent data={feedData} />
        : <ErrorAlert message={`${feedError}`} />
      }
    </Box>
  );
}
