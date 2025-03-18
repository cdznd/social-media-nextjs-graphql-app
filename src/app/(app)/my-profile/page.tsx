import { auth } from "@/lib/next-auth/auth";
import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_MY_USER_PROFILE } from "@/fragments/queries/profile";
import { GET_PRIVATE_PROFILE_FEED_INFO } from "@/fragments/queries/feed";
import { Container, Typography } from "@mui/material";
import PostListCard from "@/components/MyProfile/PostListCard";
import UserProfileInfoCard from "@/components/UserProfileInfoCard";
import ErrorAlert from "@/components/ErrorAlert";
import ProfileFriendList from "@/components/MyProfile/ProfileFriendList";
import { PostType } from "@/types/post";

async function getCurrentProfileData(
    userId: string
) {
    const data = await fetchGraphQLData(
        GET_MY_USER_PROFILE,
        { userId }
    )
    return { data }
}

async function getCurrentProfileFeedInfo(
    userId: string
) {
    const data = await fetchGraphQLData(
        GET_PRIVATE_PROFILE_FEED_INFO,
        { userId }
    )
    return { data }
}

export default async function MyProfilePage() {
    const session = await auth()
    const loggedUserId = session?.user?.id
    if (!loggedUserId) {
        return <ErrorAlert message="Error: No logged user" />
    }
    const { data } = await getCurrentProfileData(loggedUserId)
    const { data: { privateProfileFeedInfo } } = await getCurrentProfileFeedInfo(loggedUserId);
    const { privatePostsCount, publicPostsCount } = privateProfileFeedInfo || {}
    const user = data?.user
    if (!user) {
        return <ErrorAlert message={'Error: No user found'} />
    }
    const userPosts = user?.posts ?? []
    const userLikedPosts = user?.likes ? user?.likes.map((like: { post: PostType }) => like.post) : []
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
