'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { TRIGGER_POST_LIKE_MUTATION } from "@/fragments/mutations/mutations";

const apolloClient = createApolloClient();

export async function triggerLike(userId: string, postId: string) {
    const likedPostResult = await apolloClient.mutate({
        mutation: TRIGGER_POST_LIKE_MUTATION,
        variables: {
            userId,
            postId
        }
    })
    return likedPostResult?.data?.triggerLike?.likes ?? []
}