import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_PRIVATE_FEED_POSTS } from "@/fragments/queries/feed";
import { auth } from "@/lib/next-auth/auth";
import { Container } from "@mui/material";
import Feed from "@/components/Feed";
import { SearchParamsProps } from "@/types/feed";
import ErrorAlert from "@/components/ErrorAlert";

async function getPrivateFeedData(
  userId: string,
  page: number,
  searchString?: string,
  category?: string,
  visibility?: string
) {
  const apolloClient = createApolloClient();
  try {
    const postsPerPage = 10 // TODO: Update this posts per page config
    const { data } = await apolloClient.query({
      query: GET_PRIVATE_FEED_POSTS,
      variables: {
        userId,
        searchString,
        category,
        visibility,
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
  props: { searchParams: SearchParamsProps }
) {
  const { search, category, page = 1, visibility } = await props.searchParams
  const session = await auth()
  const loggedUserId = session?.user?.id
  if(!loggedUserId) {
    return <ErrorAlert message="No user id" />
  }
  // TODO: better handle the feed Error here
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
