'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { CREATE_POST_COMMENT_MUTATION } from "@/fragments/mutations/mutations"
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";

import { CreatePostDTO } from "@/types/post";

import { CREATE_POST_MUTATION } from "@/fragments/mutations/mutations";

const apolloClient = createApolloClient();

export async function createPost(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    previousState: { success: boolean },
    formData: FormData
) {
    try {
        // Ensuring the user is authorized to perform the action
        const session = await auth()
        const loggedUserId = session?.user?.id
        if (!loggedUserId) {
            throw new Error('Error with logged user')
        }

        const createPostObject = {
            title: formData.get('title'),
            content: formData.get('content'),
            authorId: loggedUserId,
            thumbnail: formData.get('thumbnail') ?? '',
            categories: formData.get('categories') ?? []
        }

        await apolloClient.mutate({
            mutation: CREATE_POST_MUTATION,
            variables: {
                ...createPostObject
            }
        })

        revalidatePath(`/`)

        return {
            success: true,
            message: ''
        }
    } catch(error) {
        console.error(error)
        return {
            success: false,
            message: ''
        }
    }
}