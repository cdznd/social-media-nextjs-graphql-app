import Feed from "@/components/Feed";
import createApolloClient from "@/lib/apolloClient";
import { GET_FEED_POSTS } from "@/graphql/mutations";
import { auth } from "@/lib/auth";
import { Container } from "@mui/system";

async function getFeedData(userId: String, search?: string, category?: string) {
  const apolloClient = createApolloClient();
  try {
    const { data: feedData, error } = await apolloClient.query({
      query: GET_FEED_POSTS,
      variables: {
        userId,
        search,
        category
      },
    });
    return { data: feedData, feedError: null };
  } catch (error) {
    return { data: null, feedError: error };
  }
}

type SearchParamsProps = {
  searchParams: {
    category?: string,
    search?: string
  }
}

export default async function Home(
  { searchParams }: SearchParamsProps
) {
  const session = await auth()
  
  const { data, feedError } = await getFeedData(
    session?.user?.id!,
    searchParams?.search,
    undefined
  );

  const feedPosts = data?.posts

  return (
    <Container>
      <Feed feedData={feedPosts} />
    </Container>
  );
}
