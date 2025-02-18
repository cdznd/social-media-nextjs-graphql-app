import { Card, Container } from "@mui/material";
import UserProfileCard from "@/components/UserProfileCard";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { GET_ALL_USERS } from "@/lib/graphql/fragments/queries/user";
import { auth } from "@/lib/next-auth/auth";

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
    const renderAllUsers = allUsers.map((user: any) => {
        return <UserProfileCard
            key={user.id}
            user={user}
        />
    })
    return (
        <Container>
            <Card sx={{ display: 'flex', gap: 4 }}>
                {renderAllUsers}
            </Card>
        </Container>
    )
}