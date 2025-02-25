import UserProfileCard from "@/components/UserProfileCard";
import { Box, Card, Typography, Alert, Stack, Grid } from "@mui/material"

export default function ProfileFriendList({ userFriends }: { userFriends: any }) {

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
                                        (friend: any) => {
                                            const userFriend = friend.user
                                            return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                                                    <UserProfileCard user={userFriend} />
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