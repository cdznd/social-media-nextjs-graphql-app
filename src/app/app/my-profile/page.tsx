import { Avatar, Card, CardContent, Typography, Container } from "@mui/material";
import { auth } from "@/lib/auth";
import createApolloClient from "@/lib/apolloClient";
import { GET_USER_PROFILE } from "@/graphql/query/user";

async function getCurrentProfileData(userId: any) {
    const apolloClient = createApolloClient()
    try {
      const { data: currentProfileData } = await apolloClient.query({
        query: GET_USER_PROFILE,
        variables: { userId }
      })
      return { data: currentProfileData, feedError: null }
    } catch (error) {
      return { data: null, feedError: error }
    }
}

export default async function MyProfilePage() {
    const session = await auth()
    const { data } = await getCurrentProfileData(session?.user?.id)
    return (
        <Container>
            <Card sx={{
                p: 3,
                textAlign: "center",
                mb: 4,
                display: 'flex',
                justifyContent: 'start'
            }}>
                <Avatar
                    src="/default-avatar.png" // Replace with dynamic data later
                    alt="User Name"
                    sx={{
                        width: 100,
                        height: 100,
                    }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Typography variant="h5">John Doe</Typography>
                    <Typography variant="body2" color="text.secondary">
                        johndoe@example.com
                    </Typography>
                </CardContent>
            </Card>

            {/* User's Posts Feed */}
            <Typography variant="h6" gutterBottom>
                My Posts
            </Typography>



        </Container>
    );
}
