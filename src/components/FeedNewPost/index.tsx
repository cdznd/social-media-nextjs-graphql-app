import { auth } from "@/lib/next-auth/auth";
import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_USER_BY_ID } from "@/fragments/queries/user";
import { GET_CATEGORIES } from "@/fragments/queries/category";
import { Container, Stack } from "@mui/material";
import UserAvatar from "../UserAvatar";
import FeedNewPostButton from "../FeedNewPostButton";
import { CategoryType } from "@/types/category";

async function getUserInfo(userId: string) {
    const data = await fetchGraphQLData(
        GET_USER_BY_ID,
        {
            userId
        }
    )
    return { data }
}

async function getCategories() {
    const data = await fetchGraphQLData(
        GET_CATEGORIES
    )
    return { data }
}

export default async function FeedNewPost() {
    const session = await auth()
    const loggedUserId = session?.user?.id
    const loggedUser = loggedUserId ? await getUserInfo(loggedUserId) : null;
    const loggedUserData = loggedUser?.data?.user ?? null
    const categories = await getCategories()
    const formCategories: CategoryType[] = categories.data.categories ?? []
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