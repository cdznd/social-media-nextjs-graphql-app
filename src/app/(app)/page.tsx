import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_PRIVATE_FEED_POSTS } from "@/lib/graphql/fragments/queries/feed";
import { auth } from "@/lib/next-auth/auth";
import { Container } from "@mui/system";
import Feed from "@/components/Feed";

import { SearchParamsProps } from "@/types/feed";

async function getPrivateFeedData(userId: string, searchString?: string, category?: string) {
  const apolloClient = createApolloClient();
  try {
    const { data } = await apolloClient.query({
      query: GET_PRIVATE_FEED_POSTS,
      variables: {
        userId,
        searchString,
        category
      },
    });
    return { data, feedError: null };
  } catch (error) {
    console.error(error)
    return { data: null, feedError: error };
  }
}

export default async function Home(
  { searchParams }: SearchParamsProps
) {
  const { search, category } = await searchParams

  console.log('Inside paage?');
  console.log('search', search);
  console.log('category', category);

  const session = await auth()
  // TODO: better handle the feed Error here
  const { data, feedError } = await getPrivateFeedData(
    session?.user?.id!,
    search,
    category
  );

  console.log('checking data');
  console.log(data);

  // TODO: Add a type for the feedPosts here, like feedPosts: type
  const feedPosts = data?.feedPosts ?? []
  return (
    <Container>
      <Feed
        feedData={feedPosts}
        feedType="private"
      />
    </Container>
  );
}
