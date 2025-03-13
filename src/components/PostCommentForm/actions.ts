'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
// import { TRIGGER_POST_LIKE_MUTATION } from "@/fragments/mutations/mutations";
import { CREATE_POST_COMMENT_MUTATION } from "@/fragments/mutations/mutations"
import { auth } from "@/lib/next-auth/auth";

const apolloClient = createApolloClient();

export async function createComment(postId: string, userId: string, previousState: any, formData: FormData) {

    // const userId = ''
    // const postId = ''

    console.log('form data here');
    console.log(formData.get('content'));

    const content = formData.get('content')
    // Ensuring the user is authorized to perform the action
    const session = await auth()
    const loggedUserId = session?.user?.id
    if (loggedUserId !== userId) {
        throw new Error('Error with logged user')
    }
    const createCommentResult = await apolloClient.mutate({
        mutation: CREATE_POST_COMMENT_MUTATION,
        variables: {
            content,
            userId,
            postId
        }
    })
    console.log('checking creation result');
    console.log(createCommentResult);

    return {
        success: true
    }

}