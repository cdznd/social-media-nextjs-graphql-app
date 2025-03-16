import createApolloClient from "@/lib/apollo-client/apolloClient";
import { auth } from "@/lib/next-auth/auth";
import { GET_USER_BY_ID } from "@/fragments/queries/user";
import { Container, Stack } from "@mui/material";
import UserAvatar from "../UserAvatar";
import FeedNewPostButton from "../FeedNewPostButton";
import { GET_CATEGORIES } from "@/fragments/queries/category";
import { CategoryType } from "@/types/category";

async function getUserInfo(userId: string) {
    const apolloClient = createApolloClient()
    try {
        const { data } = await apolloClient.query({
            query: GET_USER_BY_ID,
            variables: {
                userId: userId
            }
        })
        return { data, error: null }
    } catch (error) {
        console.error(error)
        return { data: null, error }
    }
}

async function getCategories() {
    const apolloClient = createApolloClient()
    try {
        const { data } = await apolloClient.query({
            query: GET_CATEGORIES
        })
        return { data, error: null }
    } catch(error) {
        console.error(error)
        return { data: null, error: error }
    }
}

export default async function FeedNewPost() {
    const session = await auth()
    const loggedUserId = session?.user?.id
    const loggedUser = loggedUserId ? await getUserInfo(loggedUserId) : null;
    const loggedUserData = loggedUser?.data?.user ?? null
    const categories = await getCategories()
    const formCategories: CategoryType[] =  categories.data.categories ?? []
    return (
        <Container
            sx={{
                maxWidth: { xs: "100%", sm: "80%", md: "900px" },
            }}
        >
            <Stack
                direction='row'
                justifyContent='start'
                alignItems='center'
                spacing={2}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 2,
                    mx: 'auto',
                    backgroundColor: 'background.paper',
                    w: 1
                }}
            >
                <UserAvatar
                    userImage={loggedUserData?.image}
                    size={{
                        height: 65,
                        width: 65
                    }} />
                <FeedNewPostButton
                    categories={formCategories}
                />
            </Stack>
        </Container>
    )
}