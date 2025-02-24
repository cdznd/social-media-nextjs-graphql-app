import { Box, Typography, Button, Chip } from "@mui/material";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_CATEGORIES } from "@/lib/graphql/fragments/queries/category";
import Search from "./Search";
import CategorySelector from "./CategorySelector";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

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
    const categories = data?.categories ?? []
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
                    <Search />
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
                <Typography variant="body2">Number of posts: 56</Typography>
                <Box>
                    <Button>
                        <Chip
                            label={'All'}
                        />
                    </Button>
                    <Button>
                        <Chip
                            icon={<PublicIcon />}
                            color={'success'}
                            variant='outlined'
                            label={'Public'}
                            sx={{
                                p: 1
                            }}
                        />
                    </Button>
                    <Button>
                        <Chip
                            icon={<LockIcon />}
                            color={'info'}
                            variant='outlined'
                            label={"Private"}
                            sx={{
                                p: 1
                            }}
                        />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
