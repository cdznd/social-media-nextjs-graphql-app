import Feed from "@/components/Feed";
import createApolloClient from "@/lib/apolloClient";
import { GET_FEED_POSTS } from "@/graphql/mutations";
import { auth } from "@/lib/auth";
import { Container } from "@mui/system";

async function getFeedData(userId: string) {
  const apolloClient = createApolloClient()
  try {
    const { data: feedData } = await apolloClient.query({
      query: GET_FEED_POSTS
    })
    return { data: feedData, feedError: null }
  } catch (error) {
    return { data: null, feedError: error }
  }
}

export default async function Home() {
  const session = await auth()
  const { data, feedError } = await getFeedData(session?.user?.id!)
  const feedPosts = data?.posts
  return (
    <Container>
      <Feed feedData={feedPosts} />
    </Container>
  );
}
