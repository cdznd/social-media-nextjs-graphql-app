import Box from '@mui/material/Box';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';

import { gql } from '@apollo/client';

import createApolloClient from "@/lib/apolloClient";

const GET_DATA = gql`
  query Posts {
    posts {
      id
      likes {
        user {
          id
          name
          image
        }
      }
    }
  }
`;

async function getServerSideProps() {
  const apolloClient = createApolloClient()
  const { data: feedData } = await apolloClient.query({
    query: GET_DATA
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
