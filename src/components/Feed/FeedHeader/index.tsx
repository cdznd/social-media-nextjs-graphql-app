import { Box } from "@mui/material";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_CATEGORIES } from "@/lib/graphql/fragments/queries/category";
import Search from "./Search";
import CategorySelector from "./CategorySelector";

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

export default async function FeedHeader() {
    const { data } = await getCategoriesData();
    return (
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
                <CategorySelector
                    categories={data.categories} />
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
                <Search />
            </Box>
        </Box>
    );
}
