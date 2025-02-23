import { Container } from "@mui/material"
import ErrorAlert from "@/components/ErrorAlert"
import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_USER_PROFILE } from "@/lib/graphql/fragments/queries/user"
import { GET_PRIVATE_PROFILE_FEED_POSTS } from "@/lib/graphql/fragments/queries/feed"
import UserProfileInfoCard from "@/components/UserProfileInfoCard"
import { auth } from "@/lib/next-auth/auth"

import Feed from "@/components/Feed"

type UserPageParams = {
    params: {
        userId: string,
        page?: number,
        search?: string,
        category?: string
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

async function getCurrentProfileFeed(
    userId: string,
    page: number,
    searchString?: string,
    category?: string
) {
    const apolloClient = createApolloClient()
    try {
        const postsPerPage = 10 // TODO: Update this posts per page config
        const { data } = await apolloClient.query({
            query: GET_PRIVATE_PROFILE_FEED_POSTS,
            variables: {
                userId,
                searchString,
                category,
                take: postsPerPage,
                skip: (page - 1) * postsPerPage
            },
        });
        return { data, feedError: null }
    } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        return { data: null, feedError: error }
    }
}

export default async function UserPage(
    { params }: UserPageParams
) {

    const {
        userId,
        page = 1,
        search,
        category
    } = await params

    const session = await auth()
    const loggedUserId = session?.user?.id!

    const { data: { user: currentUser } } = await getCurrentProfileData(userId);
    // const user = data?.user
    if (!currentUser) return <ErrorAlert message={'No User found'} />;

    // Get all friends from this currentUser
    const currentProfileFriends = currentUser.friends;
    // Checks if the logged currentUser is friend of the currentUser
    const friendFriendship = currentProfileFriends.find((friend: any) => friend.user.id === loggedUserId)

    let profileFeedPosts;
    let profileFeedPostsCount;
    let profileFeedPostsTotalPages;
    if (friendFriendship?.status === 'ACCEPTED') {
        const { data } = await getCurrentProfileFeed(userId, page, search, category)
        const { 
            posts: feedPosts = [],
            totalCount = 0,
            totalPages = 1
        } = data?.privateProfileFeed
        profileFeedPosts = feedPosts
        profileFeedPostsCount = totalCount
        profileFeedPostsTotalPages = totalPages
    }

    if (currentUser?.id === session?.user?.id) return <ErrorAlert message={'The user is the same of the logged one'} />;

    return (
        <Container>
            <UserProfileInfoCard
                user={currentUser}
                displayFriendshipButton
            />
            {
                friendFriendship?.status === 'ACCEPTED' && profileFeedPosts
                    ? (
                        <>
                            <h1>Total posts: {profileFeedPostsCount}</h1>
                            <Feed
                                feedData={profileFeedPosts}
                                feedType="private"
                                totalPages={profileFeedPostsTotalPages}
                            />
                        </>
                    ) : <ErrorAlert message="Private account" />
            }
        </Container>
    )
}