import { auth } from "@/lib/next-auth/auth";
import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_ALL_USERS } from "@/fragments/queries/user";
import { Alert, Container, Grid, Typography, Box, Stack } from "@mui/material";
import UserProfileCard from "@/components/UserProfileCard";
import PaginationComponent from "@/components/PaginationComponent";
import GeneralSearch from "@/components/GeneralSearch";
import { UserType } from "@/types/user";
import { SearchParamsProps } from "@/types/feed";

async function getAllUsers(page: number, searchString?: string) {
    const usersPerPage = page == 1 ? 13 : 12
    const data = await fetchGraphQLData(
        GET_ALL_USERS,
        {
            searchString: searchString,
            take: usersPerPage,
            skip: (page - 1) * usersPerPage
        }
    )
    return { data };
}

export default async function usersPage(
    props: { searchParams: SearchParamsProps }
) {
    const { search, page = 1 } = await props.searchParams
    const session = await auth()
    const loggedUserId = session?.user?.id ?? ''
    const { data } = await getAllUsers(page, search)
    const {
        users = [],
        totalPages: totalUsersPages = 0
    } = data?.allUsers ?? {}
    // Filtering to remove the current logged user from the list.
    // I could have done it on the backend, but for now it's the simplest way to do it.
    const allUsers = Array.isArray(users)
        ? users.filter((user: UserType) => user.id !== loggedUserId)
        : []
    const emptyListOfUsers = allUsers.length === 0
    return (
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant="h4" sx={{ textAlign: "center" }}>All Users</Typography>
                <GeneralSearch />
            </Stack>
            <Box>
                {
                    emptyListOfUsers ?
                        <Box sx={{ mt: 2, mb: 2 }}><Alert severity="info">No users available</Alert></Box> :
                        (
                            <Grid container spacing={3} sx={{ py: 4 }}>
                                {
                                    allUsers.map((user: UserType) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                                            <UserProfileCard
                                                user={user}
                                                loggedUserId={loggedUserId}
                                                key={user.id} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                }
                <PaginationComponent totalPages={totalUsersPages} />
            </Box>
        </Container>
    )
}