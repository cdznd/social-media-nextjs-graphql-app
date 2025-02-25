import { Card, Container, Grid, Typography } from "@mui/material";
import UserProfileCard from "@/components/UserProfileCard";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_ALL_USERS } from "@/fragments/queries/user";
import { auth } from "@/lib/next-auth/auth";
import { UserType } from "@/types/user";

async function getAllUsers() {
    const apolloClient = createApolloClient()
    try {
        const { data } = await apolloClient.query({
            query: GET_ALL_USERS,
        });
        return { data, feedError: null };
    } catch (error) {
        console.error(error)
        return { data: null, feedError: error };
    }
}

export default async function usersPage() {
    const { data } = await getAllUsers()
    const session = await auth()
    // Filtering to remove the current logged user from the list.
    // I could have done it on the backend, but for now it's the simplest way to do it.
    const allUsers = Array.isArray(data?.users)
        ? data?.users.filter((user: any) => user.id !== session?.user?.id)
        : []
    return (
        <Container>
            <Card>
                <Typography variant="h3" sx={{ textAlign: "center" }}>All Users</Typography>
                <Grid container spacing={3} sx={{ py: 4 }}>
                    {allUsers.map((user: UserType) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                            <UserProfileCard user={user} />
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </Container>
    )
}