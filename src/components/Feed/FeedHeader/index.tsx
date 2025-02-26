import { Box, Typography, Stack, Chip } from "@mui/material";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_CATEGORIES } from "@/fragments/queries/category";
import GeneralSearch from "../../GeneralSearch";
import CategorySelector from "./CategorySelector";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityFilter from "./VisibilityFilter";

async function getCategoriesData() {
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

type FeedHeaderProps = {
    numberOfPosts: number,
    feedType: string
}

export default async function FeedHeader({ numberOfPosts, feedType }: FeedHeaderProps) {
    const { data } = await getCategoriesData();
    const categories = data?.categories ?? []
    const isNotExploreFeed = feedType !== 'explore'
    return (
        <Box>
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

        </Box>
    );
}
