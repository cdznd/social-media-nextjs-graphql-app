import { Alert, Container, Grid, Typography, Box, Stack } from "@mui/material";
import UserProfileCard from "@/components/UserProfileCard";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_ALL_USERS } from "@/fragments/queries/user";
import { auth } from "@/lib/next-auth/auth";
import { UserType } from "@/types/user";
import { SearchParamsProps } from "@/types/feed";
import PaginationComponent from "@/components/PaginationComponent";
import GeneralSearch from "@/components/GeneralSearch";

async function getAllUsers(page: number, searchString?: string) {
    const apolloClient = createApolloClient()
    try {
        const usersPerPage = 10
        const { data } = await apolloClient.query({
            query: GET_ALL_USERS,
            variables: {
                searchString: searchString,
                take: usersPerPage,
                skip: (page - 1) * usersPerPage
            }
        });
        return { data, feedError: null };
    } catch (error) {
        console.error(error)
        return { data: null, feedError: error };
    }
}

export default async function usersPage(
    { searchParams }: SearchParamsProps
) {
    const { search, page = 1 } = await searchParams
    const session = await auth()
    const { data } = await getAllUsers(page, search)
    const {
        users = [],
        totalCount: totalUsers = 0,
        totalPages: totalUsersPages = 0
    } = data?.allUsers ?? {}
    // Filtering to remove the current logged user from the list.
    // I could have done it on the backend, but for now it's the simplest way to do it.
    const allUsers = Array.isArray(users)
        ? users.filter((user: any) => user.id !== session?.user?.id)
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
                        <Box sx={{ mt: 2 }}><Alert severity="info">No users available</Alert></Box> :
                        (
                            <Grid container spacing={3} sx={{ py: 4 }}>
                                {
                                    allUsers.map((user: UserType) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                                            <UserProfileCard user={user} />
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