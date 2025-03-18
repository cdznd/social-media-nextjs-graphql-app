import { auth } from "@/lib/next-auth/auth"
import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_USER_PROFILE } from "@/fragments/queries/profile"
import {
    GET_PRIVATE_PROFILE_FEED_POSTS,
    GET_PRIVATE_PROFILE_FEED_INFO
} from "@/fragments/queries/feed"
import { Container } from "@mui/material"
import ErrorAlert from "@/components/ErrorAlert"
import UserProfileInfoCard from "@/components/UserProfileInfoCard"
import Feed from "@/components/Feed"
import { SearchParamsProps } from "@/types/feed"
import {
    FriendshipType,
    ShortFriendshipType
} from "@/types/friendship"

async function getCurrentProfileData(userId: string) {
    const data = await fetchGraphQLData(
        GET_USER_PROFILE,
        { userId }
    )
    return { data }
}

async function getCurrentProfileFeed(
    userId: string,
    page: number,
    searchString?: string,
    category?: string,
    visibility?: string
) {
    const postsPerPage = 10;
    const data = await fetchGraphQLData(
        GET_PRIVATE_PROFILE_FEED_POSTS,
        {
            userId,
            searchString,
            category,
            visibility,
            take: postsPerPage,
            skip: (page - 1) * postsPerPage
        }
    )
    return { data }
}

async function getCurrentProfileFeedInfo(
    userId: string
) {
    const data = await fetchGraphQLData(
        GET_PRIVATE_PROFILE_FEED_INFO,
        {
            userId
        }
    )
    return { data }
}

type UserPageParams = Promise<{
    userId: string,
}>

export default async function UserPage(
    props: { params: UserPageParams, searchParams: SearchParamsProps },
) {

    const {
        userId,
    } = await props.params

    const {
        page = 1,
        search,
        category,
        visibility
    } = await props.searchParams

    const session = await auth()
    const loggedUserId = session?.user?.id

    if (!loggedUserId) {
        return <ErrorAlert message="No Logged User ID" />
    }

    const { data: { user: currentUser } } = await getCurrentProfileData(userId);
    const { data: { privateProfileFeedInfo } } = await getCurrentProfileFeedInfo(userId);
    const { privatePostsCount, publicPostsCount } = privateProfileFeedInfo || {}

    if (!currentUser) return <ErrorAlert message={'No User found'} />;

    // Get all friends from this currentUser
    const currentProfileFriends = currentUser?.friends ?? [];
    const numberOfFriends = currentProfileFriends.reduce(
        (acc: number, friendship: FriendshipType) => {
            if (friendship?.status === 'ACCEPTED') {
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