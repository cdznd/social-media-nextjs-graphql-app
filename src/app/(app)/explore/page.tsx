import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_EXPLORE_FEED_POSTS } from "@/fragments/queries/feed";
import { Container } from "@mui/material";
import Feed from "@/components/Feed";
import { SearchParamsProps } from "@/types/feed";

async function getExploreFeedData(
  page: number,
  searchString?: string,
  category?: string,
) {
  const postsPerPage = 10
  const data = await fetchGraphQLData(
    GET_EXPLORE_FEED_POSTS,
    {
      searchString,
      category,
      take: postsPerPage,
      skip: (page - 1) * postsPerPage
    },
  )
  return { data };
}

export default async function ExplorePage(
  props: { searchParams: SearchParamsProps }
) {
  const { search, category, page = 1 } = await props.searchParams
  const { data } = await getExploreFeedData(
    page,
    search,
    category
  );
  const feedPosts = data?.exploreFeedPosts?.posts ?? []
  const totalPosts = data?.exploreFeedPosts?.totalCount ?? 0
  const totalPages = data?.exploreFeedPosts?.totalPages ?? 0
  return (
    <Container>
      <Feed
        feedData={feedPosts}
        feedType="explore"
        totalPages={totalPages}
        numberOfPosts={totalPosts}
      />
    </Container>
  )
}