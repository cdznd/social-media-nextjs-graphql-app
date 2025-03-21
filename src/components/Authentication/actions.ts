'use server'
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { CREATE_USER_MUTATION } from "@/fragments/mutations/mutations";

const apolloClient = createApolloClient();

export async function signUp(
    previousState: { success: boolean },
    formData: FormData
) { 
    try {
        const createUserDTO = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            username: formData.get('username')
        }
        await apolloClient.mutate({
            mutation: CREATE_USER_MUTATION,
            variables: {
                ...createUserDTO
            }
        })
        return {
            success: true,
            message: 'User created with success!'
        }
    } catch (error) {
        console.error(error)
        // console.log(error.networkError.result.errors);
        return {
            success: false,
            message: 'Error creating user'
        }
    }
}