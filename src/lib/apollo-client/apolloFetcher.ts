import { DocumentNode } from "graphql";
import createApolloClient from "./apolloClient";

export async function fetchGraphQLData(
    query: DocumentNode,
    variables?: Record<string, any>
) {
    const apolloClient = createApolloClient();
    try {
        const { data } = await apolloClient.query({
            query,
            variables
        });
        return data;
    } catch (error) {
        console.error(error)
        throw new Error('Data fetching error')
    }
}