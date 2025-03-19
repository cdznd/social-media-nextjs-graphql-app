// 'use server'
// import createApolloClient from "@/lib/apollo-client/apolloClient";

// // import { auth } from "@/lib/next-auth/auth";
// // import { revalidatePath } from "next/cache";
// import { CREATE_USER_MUTATION } from "@/fragments/mutations/mutations";

// const apolloClient = createApolloClient();

// export async function createPost(
//     previousState: { success: boolean },
//     formData: FormData
// ) {
//     try {
//         const session = await auth()
//         const loggedUserId = session?.user?.id
//         if (!loggedUserId) {
//             throw new Error('Error with logged user')
//         }
//         const categories = formData.get('categories') as string
//         const parsedCategories = JSON.parse(categories)
//         const createPostObject = {
//             title: formData.get('title'),
//             content: formData.get('content'),
//             authorId: loggedUserId,
//             thumbnail: formData.get('thumbnail') ?? '',
//             categories: parsedCategories ?? [],
//             visibility: formData.get('visibility') ?? 'PUBLIC'
//         }
//         await apolloClient.mutate({
//             mutation: CREATE_POST_MUTATION,
//             variables: {
//                 ...createPostObject
//             }
//         })
//         revalidatePath(`/`)
//         return {
//             success: true,
//             message: 'Post created with success!'
//         }
//     } catch(error) {
//         console.error(error)
//         // console.log(error.networkError.result.errors);
//         return {
//             success: false,
//             message: 'Error creating post'
//         }
//     }
// }