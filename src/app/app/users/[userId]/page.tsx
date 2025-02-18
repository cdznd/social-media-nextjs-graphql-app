import { Container } from "@mui/material"
import ErrorAlert from "@/components/ErrorAlert"
import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_USER_PROFILE } from "@/lib/graphql/fragments/queries/user"
import UserProfileInfoCard from "@/components/UserProfileInfoCard"
import { auth } from "@/lib/next-auth/auth"

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
    { params }: UserPageParams
) {

    const { userId } = await params

    const session = await auth()
    const loggedUserId = session?.user?.id!

    console.log('loggedUserId', loggedUserId);

    const { data: { user: currentUser } } = await getCurrentProfileData(userId);
    // const user = data?.user
    if (!currentUser) return <ErrorAlert message={'No User found'} />;

    // Get all friends from this currentUser
    const currentProfileFriends = currentUser.friends;
    // Checks if the logged currentUser is friend of the currentUser
    const friendFriendship = currentProfileFriends.find((friend: any) => friend.user.id === loggedUserId)

    console.log('Logged User');
    console.log(session?.user);
    console.log('Current User');
    console.log(currentUser);

    if (currentUser?.id === session?.user?.id) return <ErrorAlert message={'The user is the same of the logged one'} />;

    return (
        <Container>
            <UserProfileInfoCard
                user={currentUser}
                displayFriendshipButton
            />
            <ErrorAlert message="Private account" />
        </Container>
    )
}