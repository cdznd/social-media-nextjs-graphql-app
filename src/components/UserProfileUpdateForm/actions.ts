'use server'
import { UPDATE_USER_MUTATION } from "@/fragments/mutations/mutations";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";

const apolloClient = createApolloClient();

export async function updateProfile(
    previousState: { success: boolean },
    formData: FormData
) {
    try {
        const session = await auth();
        const loggedUserId = session?.user?.id
        if(!loggedUserId) {
            throw new Error('Error with logged user')
        }
        const updateUserProfileDTO = {
            userId: formData.get('userId'),
            name: formData.get('name') ?? null,
            image: formData.get('thumbnail') ?? null 
        }
        await apolloClient.mutate({
            mutation: UPDATE_USER_MUTATION,
            variables: {
                ...updateUserProfileDTO
            }
        })
        revalidatePath('/my-profile')
        return {
            success: true,
            message: 'Profile update with success!'
        }
    } catch(error) {
        console.error(error)
        return {
            success: false,
            message: 'Error while updating profile!'
        }
    }
}