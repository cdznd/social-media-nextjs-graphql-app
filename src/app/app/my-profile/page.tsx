import { Box, Avatar, Card, CardContent, Typography, Container } from "@mui/material";
import { auth } from "@/lib/auth";
import createApolloClient from "@/lib/apolloClient";
import { GET_USER_PROFILE } from "@/graphql/query/user";
import MyPostsCard from "@/components/MyProfile/PostList";
import PostList from "@/components/MyProfile/PostList";
import UserProfileCard from "@/components/MyProfile/UserProfileCard";

async function getCurrentProfileData(userId: any) {
    const apolloClient = createApolloClient()
    try {
        const { data: currentProfileData } = await apolloClient.query({
            query: GET_USER_PROFILE,
            variables: { userId }
        })
        return { data: currentProfileData, feedError: null }
    } catch (error) {
        return { data: null, feedError: error }
    }
}

export default async function MyProfilePage() {
    const session = await auth()
    const { data } = await getCurrentProfileData(session?.user?.id)

    const user = data?.user
    if (!user) {
        throw ('No User found')
    }

    const userPosts = user?.posts ?? []
    const userLikedPosts = user?.likes ?? []

    return (
        <Container>
            <UserProfileCard
                user={user}
            />
            <PostList
                title={'My Posts'}
                posts={userPosts}
            />
            <PostList
                title={'Liked Posts'}
                posts={userLikedPosts}
            />
        </Container>
    );
}
