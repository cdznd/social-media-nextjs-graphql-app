import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_CATEGORIES } from "@/lib/graphql/fragments/queries/category";
import { Container, Card } from "@mui/material";
import { CategoryData } from "@/types/category";
import PostForm from "@/components/PostForm";

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

export default async function NewPostPage() {
    const { data } = await getCategoriesData()
    const categories: CategoryData[] = data?.categories
    return (
        <Container>
            <h1>New Post</h1>
            <Card sx={{ padding: 4 }}>
                <PostForm
                    categories={categories}
                />
            </Card>
        </Container>
    )
};
