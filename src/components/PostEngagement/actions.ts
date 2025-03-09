'use server' // Marking use server to make all exports server actions.
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { TRIGGER_POST_LIKE_MUTATION } from "@/fragments/mutations/mutations";
 
const apolloClient = createApolloClient();

export async function triggerLike(userId: string, postId: string) {
    try {
        const likedPostResult = await apolloClient.mutate({
            mutation: TRIGGER_POST_LIKE_MUTATION,
            variables: {
                userId,
                postId
            }
        })
        return {
            success: true,
            likes: likedPostResult?.data?.triggerLike?.likes ?? []
        }
    } catch(error) {
        console.error(error)
        return { // Modeling expected errors as return values
            success: false,
            error: "Failed to like the post. Please try again later.",
            likes: []
        }
    }
}