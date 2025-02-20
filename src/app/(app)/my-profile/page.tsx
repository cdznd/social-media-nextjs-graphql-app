import { Container } from "@mui/material";
import { auth } from "@/lib/next-auth/auth";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_MY_USER_PROFILE } from "@/lib/graphql/fragments/queries/user";
import PostListCard from "@/components/MyProfile/PostListCard";
import UserProfileInfoCard from "@/components/UserProfileInfoCard";
import ErrorAlert from "@/components/ErrorAlert";

import ProfileFriendList from "@/components/MyProfile/ProfileFriendList";

async function getCurrentProfileData(userId: string) {
    const apolloClient = createApolloClient()
    try {
        const { data: currentProfileData } = await apolloClient.query({
            query: GET_MY_USER_PROFILE,
            variables: { userId }
        })
        return { data: currentProfileData, feedError: null }
    } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        return { data: null, feedError: error }
    }
}

export default async function MyProfilePage() {
    const session = await auth()
    const { data } = await getCurrentProfileData(session?.user?.id!)
    const user = data?.user
    if (!user) {
        return <ErrorAlert message={'No User found'} />
    }
    const userPosts = user?.posts ?? []
    const userLikedPosts = user?.likes ?? []
    const userFriends = user?.friends ?? []

    console.log('userFriends');
    console.log(userFriends);

    return (
        <Container>

            <h1>My Profile</h1>

            <UserProfileInfoCard
                user={user}
            />

            <ProfileFriendList userFriends={userFriends} />

            <PostListCard
                title={'My Posts'}
                posts={userPosts}
            />
            <PostListCard
                title={'Liked Posts'}
                posts={userLikedPosts}
            />
        </Container>
    );
}
