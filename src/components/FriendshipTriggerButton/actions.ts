'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";
import {
    CREATE_FRIENDSHIP_REQUEST_MUTATION,
    DELETE_FRIENDSHIP_MUTATION
} from "@/fragments/mutations/friendship";
import { revalidatePath } from "next/cache";

const apolloClient = createApolloClient();

export async function triggerFriendship(
    initialState: { success: boolean, message: string },
    data: { fromUserId: string, toUserId: string }
) { 
    try {
        const session = await auth()
        const loggedUserId = session?.user?.id ?? ''
        if (loggedUserId !== data.fromUserId) {
            throw new Error('You are not allowed to send a friendship request')
        }
        await apolloClient.mutate({
            mutation: CREATE_FRIENDSHIP_REQUEST_MUTATION,
            variables: {
                fromUserId: data.fromUserId,
                toUserId: data.toUserId
            }
        })
        revalidatePath(`/users`)
        return {
            success: true,
            message: 'Friendship request sent successfully'
        }
    } catch (error) {
        console.error(error)
        // console.log(error.networkError.result.errors);
        return {
            success: false,
            message: 'Error sending friendship request'
        }
    }
}

export async function deleteFriendship(
    initialState: { success: boolean, message: string },
    data: { friendshipId: string }
) {
    try {
        const session = await auth()
        const loggedUserId = session?.user?.id ?? ''
        if (!loggedUserId) {
            throw new Error('You are not allowed to delete a friendship')
        }
        await apolloClient.mutate({
            mutation: DELETE_FRIENDSHIP_MUTATION,
            variables: {
                friendshipId: data.friendshipId
            }
        })
        revalidatePath(`/users`)
        return {
            success: true,
            message: 'Friendship deleted successfully'
        }
    } catch (error) {
        console.error(error)
        // console.log(error.networkError.result.errors);
        return {
            success: false,
            message: 'Error deleting friendship'
        }
    }
}   