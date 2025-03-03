import { Container } from "@mui/material"
import ErrorAlert from "@/components/ErrorAlert"
import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_USER_PROFILE } from "@/fragments/queries/profile"
import {
    GET_PRIVATE_PROFILE_FEED_POSTS,
    GET_PRIVATE_PROFILE_FEED_INFO
} from "@/fragments/queries/feed"
import UserProfileInfoCard from "@/components/UserProfileInfoCard"
import { auth } from "@/lib/next-auth/auth"

import Feed from "@/components/Feed"
import { SearchParamsProps } from "@/types/feed"
import { Friendship } from "@prisma/client"
import { ShortFriendshipType } from "@/types/friendship"

type UserPageParams = {
    params: {
        userId: string,
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
    category?: string,
    visibility?: string
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
                visibility,
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

export default async function UserPage(
    { params, searchParams }: UserPageParams & SearchParamsProps,
) {

    const {
        userId,
    } = await params

    const {
        page = 1,
        search,
        category,
        visibility
    } = await searchParams

    const session = await auth()
    const loggedUserId = session?.user?.id

    if(!loggedUserId) {
        return <ErrorAlert message="No Logged User ID" />
    }

    const { data: { user: currentUser } } = await getCurrentProfileData(userId);
    const { data: { privateProfileFeedInfo } } = await getCurrentProfileFeedInfo(userId);
    const { privatePostsCount, publicPostsCount } = privateProfileFeedInfo || {}

    if (!currentUser) return <ErrorAlert message={'No User found'} />;

    // Get all friends from this currentUser
    const currentProfileFriends = currentUser?.friends ?? [];
    const numberOfFriends = currentProfileFriends.reduce(
        (acc: number, friendship: Friendship ) => {
            if(friendship?.status === 'ACCEPTED') {
                acc += 1
            }
            return acc
        },
        0
    )

    // Checks if the logged currentUser is friend of the currentUser
    const friendFriendship = currentProfileFriends.find((friend: ShortFriendshipType) => friend.user.id === loggedUserId)
    const isFriend = friendFriendship?.status === 'ACCEPTED'
    const isLoggedUserProfile = currentUser?.id === session?.user?.id

    let profileFeedPosts;
    let profileFeedPostsCount;
    let profileFeedPostsTotalPages;
    if (isFriend || isLoggedUserProfile) {
        const { data } = await getCurrentProfileFeed(userId, page, search, category, visibility?.toUpperCase())
        const { 
            posts: feedPosts = [],
            totalCount = 0,
            totalPages = 1
        } = data?.privateProfileFeed
        profileFeedPosts = feedPosts
        profileFeedPostsCount = totalCount
        profileFeedPostsTotalPages = totalPages
    }
    
    return (
        <Container>
            <UserProfileInfoCard
                user={currentUser}
                displayFriendshipButton={!isLoggedUserProfile ? true : false}
                isFriend={isFriend || isLoggedUserProfile}
                generalInfo={{
                    friends: numberOfFriends,
                    privatePosts: privatePostsCount,
                    publicPosts: publicPostsCount
                }}
            />
            {
                isFriend || isLoggedUserProfile && profileFeedPosts
                    ? (
                        <>
                            <Feed
                                feedData={profileFeedPosts}
                                feedType="grid"
                                totalPages={profileFeedPostsTotalPages}
                                numberOfPosts={profileFeedPostsCount}
                            />
                        </>
                    ) : <ErrorAlert message="Private account" />
            }
        </Container>
    )
}