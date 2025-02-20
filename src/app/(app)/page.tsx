import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_PRIVATE_FEED_POSTS } from "@/lib/graphql/fragments/queries/feed";
import { auth } from "@/lib/next-auth/auth";
import { Container, Pagination } from "@mui/material";
import Feed from "@/components/Feed";

import { HomeSearchParamsProps } from "@/types/feed";

async function getPrivateFeedData(
  userId: string,
  page: number,
  searchString?: string,
  category?: string,
) {
  const apolloClient = createApolloClient();
  try {
    const postsPerPage = 10
    const { data } = await apolloClient.query({
      query: GET_PRIVATE_FEED_POSTS,
      variables: {
        userId,
        searchString,
        category,
        take: postsPerPage,
        skip: (page - 1) * postsPerPage
      },
    });
    return { data, feedError: null };
  } catch (error) {
    console.error(error)
    return { data: null, feedError: error };
  }
}

export default async function Home(
  { searchParams }: HomeSearchParamsProps
) {
  const { search, category, page = 1 } = await searchParams
  const session = await auth()
  // TODO: better handle the feed Error here
  const { data, feedError } = await getPrivateFeedData(
    session?.user?.id!,
    page,
    search,
    category
  );
  // TODO: Add a type for the feedPosts here, like feedPosts: type
  const feedPosts = data?.privateFeedPosts ?? []
  return (
    <Container>
      <Feed
        feedData={feedPosts}
        feedType="private"
      />
    </Container>
  );
}
