import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_EXPLORE_FEED_POSTS } from "@/lib/graphql/fragments/queries/feed";
import { auth } from "@/lib/next-auth/auth";
import { Container } from "@mui/material";
import Feed from "@/components/Feed";

import { SearchParamsProps } from "@/types/feed";

// It's the same from private feed but without userId, now
async function getExploreFeedData(
    page: number,
    searchString?: string,
    category?: string,
  ) {
    const apolloClient = createApolloClient();
    try {
      const postsPerPage = 10 // TODO: Update this posts per page config
      const { data } = await apolloClient.query({
        query: GET_EXPLORE_FEED_POSTS,
        variables: {
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

export default async function ExplorePage(
    { searchParams: { search, category, page = 1 } }: SearchParamsProps
) {
    // TODO: better handle the feed Error here
    const { data, feedError } = await getExploreFeedData(
        page,
        search,
        category
    );

    console.log('data');
    console.log(data?.exploreFeedPosts);

    // TODO: Add a type for the feedPosts here, like feedPosts: type
    const { 
      posts: feedPosts = [],
      totalCount = 0,
      totalPages = 1
    } = data?.exploreFeedPosts

    return (
        <Container>
            <h1>Number of posts {totalCount}</h1>
            <Feed
                feedData={feedPosts}
                feedType="public"
                totalPages={totalPages}
            />
        </Container>
    )
}