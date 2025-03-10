'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";

import { UPDATE_FRIENDSHIP_STATUS_MUTATION } from "@/fragments/mutations/friendship"
import { UPDATE_NOTIFICATION_READ_STATUS_MUTATION } from "@/fragments/mutations/notification"

import { updateNotificationReadStatus } from "../actions";

const apolloClient = createApolloClient();

export async function updateFriendshipStatus(
    notificationId: string,
    friendshipId: string,
    status: string
) {
    try {
        // Ensuring the user is authorized to perform the action
        const session = await auth()
        const loggedUserId = session?.user?.id
        if (!loggedUserId) {
            throw new Error('Error with logged user')
        }

        await apolloClient.mutate({
            mutation: UPDATE_FRIENDSHIP_STATUS_MUTATION,
            variables: {
                friendshipId,
                status
            }
        })

        const result = await updateNotificationReadStatus(notificationId)

        if(result?.success) {
            return {
                success: true,
            }
        } else {
            throw new Error('Failed to update notification read status')
        }
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }
}