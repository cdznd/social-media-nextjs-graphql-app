import Feed from "@/components/Feed";
import createApolloClient from "@/lib/apolloClient";
import { GET_FEED_POSTS } from "@/lib/graphql/mutations/mutations";
import { auth } from "@/lib/auth";
import { Container } from "@mui/system";

async function getFeedData(userId: string, searchString?: string, category?: string) {
  const apolloClient = createApolloClient();
  try {
    const { data } = await apolloClient.query({
      query: GET_FEED_POSTS,
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

type SearchParamsProps = {
  searchParams: {
    search?: string,
    category?: string
  }
}

export default async function Home(
  { searchParams: { search, category }}: SearchParamsProps
) {
  const session = await auth()
  // TODO: better handle the feed Error here
  const { data, feedError } = await getFeedData(
    session?.user?.id!,
    search,
    category
  );
  // TODO: Add a type for the feedPosts here, like feedPosts: type
  const feedPosts = data?.feedPosts ?? []
  return (
    <Container>
      <Feed feedData={feedPosts} />
    </Container>
  );
}
