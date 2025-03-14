'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { DELETE_POST_COMMENT_MUTATION } from "@/fragments/mutations/mutations"
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";

const apolloClient = createApolloClient();

export async function deleteComment(
    commentId: string,
    postId: string,
    userId: string,
) {
    try {
        // Ensuring the user is authorized to perform the action
        const session = await auth()
        const loggedUserId = session?.user?.id
        if (loggedUserId !== userId) {
            throw new Error('Error with logged user')
        }
        await apolloClient.mutate({
            mutation: DELETE_POST_COMMENT_MUTATION,
            variables: {
                commentId
            }
        })
        revalidatePath(`/posts/${postId}`)
        return {
            success: true
        }
    } catch(error) {
        console.error(error)
        return {
            success: false
        }
    }
}