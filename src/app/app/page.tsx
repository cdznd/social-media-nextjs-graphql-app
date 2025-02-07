import Feed from "@/components/Feed";
import createApolloClient from "@/lib/apolloClient";
import { GET_FEED_POSTS } from "@/lib/graphql/mutations/mutations";
import { auth } from "@/lib/auth";
import { Container } from "@mui/system";

async function getFeedData(userId: String, searchString?: string, category?: string) {
  const apolloClient = createApolloClient();
  try {
    const { data } = await apolloClient.query({
      query: GET_FEED_POSTS,
      variables: {
        userId,
      },
    });
    return { data, feedError: null };
  } catch (error) {

    console.log(JSON.stringify(error))

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

  const feedPosts = data?.feedPosts

  return (
    <Container>
      <Feed feedData={feedPosts} />
    </Container>
  );
}
