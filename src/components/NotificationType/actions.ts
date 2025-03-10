'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";
import {
    UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
    DELETE_NOTIFICATION_MUTATION
} from "@/fragments/mutations/notification"

const apolloClient = createApolloClient();

export async function updateNotificationReadStatus(notificationId: string) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) {
            throw new Error('Error with logged user')
        }
        await apolloClient.mutate({
            mutation: UPDATE_NOTIFICATION_READ_STATUS_MUTATION,
            variables: {
                notificationId: notificationId
            }
        })
        return {
            success: true
        }
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }
}

export async function deleteNotification(notificationId: string) {
    try {
        await apolloClient.mutate({
            mutation: DELETE_NOTIFICATION_MUTATION,
            variables: {
                notificationId: notificationId
            }
        })
        return {
            success: true
        }
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }
}