'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { CREATE_POST_COMMENT_MUTATION } from "@/fragments/mutations/mutations"
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";

const apolloClient = createApolloClient();

export async function createComment(
    postId: string,
    userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    previousState: { success: boolean },
    formData: FormData
) {
    try {
        const content = formData.get('content')
        // Ensuring the user is authorized to perform the action
        const session = await auth()
        const loggedUserId = session?.user?.id
        if (loggedUserId !== userId) {
            throw new Error('Error with logged user')
        }
        await apolloClient.mutate({
            mutation: CREATE_POST_COMMENT_MUTATION,
            variables: {
                content,
                userId,
                postId
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