import Box from '@mui/material/Box';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';

import createApolloClient from "@/lib/apolloClient";
import { GET_FEED_POSTS } from '@/graphql/mutations';

async function getServerSideProps() {
  const apolloClient = createApolloClient()
  const { data: feedData, error } = await apolloClient.query({
    query: GET_FEED_POSTS
  })
  return {
    feedData
  }
}

export default async function Feed() {
  const { feedData } = await getServerSideProps()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      <FeedContent data={feedData} />
    </Box>
  );
}
