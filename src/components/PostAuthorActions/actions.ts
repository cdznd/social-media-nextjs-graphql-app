'use server'
import { DELETE_POST_MUTATION } from "@/fragments/mutations/mutations"
import createApolloClient from "@/lib/apollo-client/apolloClient"
import { auth } from "@/lib/next-auth/auth"
const apolloClient = createApolloClient()

export async function deletePost(userId:string, postId: string) {
    try {
        const session = await auth()
        const loggedUserId = session?.user?.id
        if (loggedUserId !== userId) {
            throw new Error('Error with logged user')
        }
        await apolloClient.mutate({
            mutation: DELETE_POST_MUTATION,
            variables: {
                postId
            }
        })
        return {
            success: true,
            message: 'Post created with success!'
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Error trying to delete post'
        }
    }
}