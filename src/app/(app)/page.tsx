import { auth } from "@/lib/next-auth/auth";
import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_PRIVATE_FEED_POSTS } from "@/fragments/queries/feed";
import { Container } from "@mui/material";
import Feed from "@/components/Feed";
import ErrorAlert from "@/components/ErrorAlert";
import { SearchParamsProps } from "@/types/feed";

async function getPrivateFeedData(
  userId: string,
  page: number,
  searchString?: string,
  category?: string,
  visibility?: string
) {
  const postsPerPage = 10
  const data = await fetchGraphQLData(
    GET_PRIVATE_FEED_POSTS,
    {
      userId,
      searchString,
      category,
      visibility,
      take: postsPerPage,
      skip: (page - 1) * postsPerPage
    }
  )
  return { data };
}

export default async function Home(
  props: { searchParams: SearchParamsProps }
) {
  const { search, category, page = 1, visibility } = await props.searchParams
  const session = await auth()
  const loggedUserId = session?.user?.id
  if (!loggedUserId) {
    return <ErrorAlert message="Error: No logged user" />
  }
  const { data } = await getPrivateFeedData(
    loggedUserId,
    page,
    search,
    category,
    visibility?.toUpperCase()
  );
  const feedPosts = data?.privateFeedPosts.posts ?? []
  const totalPosts = data?.privateFeedPosts?.totalCount ?? 0
  const totalPages = data?.privateFeedPosts?.totalPages ?? 0
  return (
    <Container>
      <Feed
        feedData={feedPosts}
        feedType="private"
        totalPages={totalPages}
        numberOfPosts={totalPosts}
      />
    </Container>
  );
}
