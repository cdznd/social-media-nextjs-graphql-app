import { Container, Typography } from "@mui/material";
import { auth } from "@/lib/next-auth/auth";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_MY_USER_PROFILE } from "@/fragments/queries/profile";
import { GET_PRIVATE_PROFILE_FEED_INFO } from "@/fragments/queries/feed";
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

async function getCurrentProfileFeedInfo(
    userId: string
) {
    const apolloClient = createApolloClient()
    try {
        const { data } = await apolloClient.query({
            query: GET_PRIVATE_PROFILE_FEED_INFO,
            variables: {
                userId
            }
        })
        return { data, feedError: null }
    } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        return { data: null, feedError: error }
    }
}

export default async function MyProfilePage() {
    const session = await auth()
    const { data } = await getCurrentProfileData(session?.user?.id!)
    const { data: { privateProfileFeedInfo } } = await getCurrentProfileFeedInfo(session?.user?.id!);
    const { privatePostsCount, publicPostsCount } = privateProfileFeedInfo || {}

    const user = data?.user
    if (!user) {
        return <ErrorAlert message={'No User found'} />
    }
    const userPosts = user?.posts ?? []
    const userLikedPosts = user?.likes ? user?.likes.map((like: any) => like.post) : []

    const userFriends = user?.friends ?? []

    return (
        <Container>
            <Typography variant="h3" sx={{ marginBottom: '1rem' }}>My Profile</Typography>
            <UserProfileInfoCard
                user={user}
                isCurrentUser={true}
                displayFriendshipButton={false}
                generalInfo={{
                    friends: userFriends.length,
                    privatePosts: privatePostsCount,
                    publicPosts: publicPostsCount
                }}
            />
            <ProfileFriendList 
                userFriends={userFriends} />
            <PostListCard
                title={'My Posts'}
                posts={userPosts} />
            <PostListCard
                title={'Liked Posts'}
                posts={userLikedPosts} />
        </Container>
    );
}
