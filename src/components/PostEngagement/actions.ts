'use server' // Marking use server to make all exports server actions.
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { TRIGGER_POST_LIKE_MUTATION } from "@/fragments/mutations/mutations";

import { auth } from "@/lib/next-auth/auth";

const apolloClient = createApolloClient();

export async function triggerLike(userId: string, postId: string) {
    try {
        // Ensuring the user is authorized to perform the action
        const session = await auth()
        const loggedUserId = session?.user?.id
        if(loggedUserId !== userId) {
            throw new Error('Error with logged user')
        }
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
        // Modeling expected errors as return values
        return {
            success: false,
            error: "Failed to like the post. Please try again later.",
            likes: []
        }
    }
}