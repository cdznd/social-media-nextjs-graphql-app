'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";
import { CREATE_POST_MUTATION } from "@/fragments/mutations/mutations";

const apolloClient = createApolloClient();

export async function createPost(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    previousState: { success: boolean },
    formData: FormData
) {
    try {
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
            categories: formData.get('categories') ?? [],
            visibility: formData.get('visibility') ?? 'PUBLIC'
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
            message: 'Post created with success!'
        }
    } catch(error) {
        console.error(error)
        // console.log(error.networkError.result.errors);
        return {
            success: false,
            message: 'Error creating post'
        }
    }
}