import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_EXPLORE_FEED_POSTS } from "@/lib/graphql/fragments/queries/feed";
import { auth } from "@/lib/next-auth/auth";
import { Container } from "@mui/material";
import Feed from "@/components/Feed";

import { SearchParamsProps } from "@/types/feed";

async function getExploreFeedData(searchString?: string, category?: string) {
    const apolloClient = createApolloClient();
    try {
        const { data } = await apolloClient.query({
            query: GET_EXPLORE_FEED_POSTS,
            variables: {
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

export default async function ExplorePage(
    { searchParams: { search, category, page } }: SearchParamsProps
) {
    // TODO: better handle the feed Error here
    const { data, feedError } = await getExploreFeedData(
        search,
        category
    );
    // TODO: Add a type for the feedPosts here, like feedPosts: type
    const feedPosts = data?.exploreFeedPosts ?? []
    return (
        <Container>
            <Feed
                feedData={feedPosts}
                feedType="public"    
            />
        </Container>
    )
}