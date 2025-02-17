import { Container } from "@mui/material"
import ErrorAlert from "@/components/ErrorAlert"
import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_USER_PROFILE } from "@/lib/graphql/fragments/queries/user"
import UserProfileInfoCard from "@/components/UserProfileInfoCard"

type UserPageParams = {
    params: {
        userId: string
    }
}

async function getCurrentProfileData(userId: string) {
    const apolloClient = createApolloClient()
    try {
        const { data: currentProfileData } = await apolloClient.query({
            query: GET_USER_PROFILE,
            variables: { userId }
        })
        return { data: currentProfileData, feedError: null }
    } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        return { data: null, feedError: error }
    }
}

export default async function UserPage(
    { params: { userId } }: UserPageParams
) {
    const { data } = await getCurrentProfileData(userId)
    const user = data?.user
    if (!user) {
        return <ErrorAlert message={'No User found'} />
    }
    return (
        <Container>
            <UserProfileInfoCard
                user={user}
            />
            Feed Here
        </Container>
    )
}