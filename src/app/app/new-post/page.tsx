import PostForm from "@/components/PostForm";

import { Container } from "@mui/material";

import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_CATEGORIES } from "@/lib/graphql/fragments/queries/category";
import { CategoryData } from "@/types/category";

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

            <h1>Create new post</h1>

            <PostForm
                categories={categories}
            />

        </Container>
    )

};
