import UserProfileCard from "@/components/UserProfileCard";
import { FriendWithStatus } from "@/types/friendship";
import { Box, Card, Typography, Alert, Stack, Grid } from "@mui/material"
import { auth } from "@/lib/next-auth/auth";

export default async function ProfileFriendList({ userFriends }: { userFriends: FriendWithStatus[] }) {
    const session = await auth()
    const loggedUserId = session?.user?.id ?? ''
    const emptyFriendList = userFriends.length === 0
    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            textAlign: "center",
            p: 3,
            mb: 4,
            boxShadow: 3,
            borderRadius: 2
        }}>
            <Stack
                direction="row"
                justifyContent="start"
                alignItems="center"
            >
                <Typography variant="h5">
                    Friends
                </Typography>
            </Stack>
            <Box
                sx={{
                    maxHeight: '800px',
                    overflowY: 'scroll'
                }}
            >
                {
                    emptyFriendList ?
                        <Alert severity="info">Sorry, you have no friends yet</Alert> :
                        (
                            <Grid container spacing={3}>
                                {
                                    userFriends.map(
                                        (friend: FriendWithStatus) => {
                                            const userFriend = friend.user
                                            return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={userFriend.id}>
                                                    <UserProfileCard user={userFriend} loggedUserId={loggedUserId} />
                                                </Grid>
                                            )
                                        }
                                    )
                                }
                            </Grid>
                        )
                }
            </Box>
        </Card>
    );
}