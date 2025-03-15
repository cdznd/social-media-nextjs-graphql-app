import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_CATEGORIES } from "@/fragments/queries/category";
import { Box, Typography } from "@mui/material";
import GeneralSearch from "../../GeneralSearch";
import CategorySelector from "./CategorySelector";
import VisibilityFilter from "./VisibilityFilter";
import { FeedHeaderProps } from "@/types/feed";

async function getCategories() {
    const apolloClient = createApolloClient();
    try {
        const { data } = await apolloClient.query({
            query: GET_CATEGORIES,
        });
        return { data, feedError: null };
    } catch (error) {
        console.error(error)
        return { data: null, feedError: error };
    }
}

export default async function FeedHeader(
    { 
        numberOfPosts,
        feedType
    }: FeedHeaderProps
) {
    const { data } = await getCategories();
    const categories = data?.categories ?? []
    const isNotExploreFeed = feedType !== 'explore'
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", md: "row" },
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: { xs: "start", md: "center" },
                    gap: 4,
                    overflow: "auto",
                }}
            >
                <Box
                    sx={{
                        display: "inline-flex",
                        flexDirection: "row",
                        gap: 3,
                        overflow: "auto",
                        flex: 1
                    }}
                >
                    {
                        categories.length > 0 && (
                            <CategorySelector
                                categories={categories} />
                        )
                    }
                </Box>
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        flexDirection: "row",
                        gap: 1,
                        width: { xs: "100%", md: "fit-content" },
                        overflow: "auto",
                    }}
                >
                    <GeneralSearch />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", md: "row" },
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: { xs: "start", md: "center" },
                    gap: 4,
                    overflow: "auto",
                    marginTop: '1rem',
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '12px' }}>Number of posts: {numberOfPosts}</Typography>
                {
                    isNotExploreFeed && <VisibilityFilter />
                }
            </Box>
        </>
    );
}
