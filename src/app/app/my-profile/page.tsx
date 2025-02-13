import { Container } from "@mui/material";
import { auth } from "@/lib/auth";
import createApolloClient from "@/lib/apolloClient";
import { GET_USER_PROFILE } from "@/lib/graphql/fragments/queries/user";
import PostListCard from "@/components/MyProfile/PostListCard";
import UserProfileCard from "@/components/MyProfile/UserProfileCard";
import ErrorAlert from "@/components/ErrorAlert";

import { Box } from '@mui/material'

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
    return (
        <Container>
            <UserProfileCard
                user={user}
            />

            <Box sx={{
                border: '1px solid red'
            }}>
                <h1>friends</h1>
                {
                    userFriends.map((f: any) => {
                        return (
                            <>
                                <p>{f.name}</p>
                            </>
                        )
                    })
                }
            </Box>

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
