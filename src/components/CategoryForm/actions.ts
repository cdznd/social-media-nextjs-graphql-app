'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";
import { CREATE_CATEGORY_MUTATION } from "@/fragments/mutations/mutations";

const apolloClient = createApolloClient();

export async function createCategory(
    previousState: { success: boolean },
    formData: FormData
) {
    try {
        const session = await auth()
        const loggedUserId = session?.user?.id
        if (!loggedUserId) {
            throw new Error('Error with logged user')
        }
        const createCategoryDTO = {
            name: formData.get('name'),
        }
        await apolloClient.mutate({
            mutation: CREATE_CATEGORY_MUTATION,
            variables: {
                ...createCategoryDTO
            }
        })
        revalidatePath(`/`)
        return {
            success: true,
            message: 'Category created with success!'
        }
    } catch(error) {
        console.error(error)
        // console.log(error.networkError.result.errors);
        return {
            success: false,
            message: 'Error creating category'
        }
    }
}