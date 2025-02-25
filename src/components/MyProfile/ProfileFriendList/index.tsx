import UserProfileCard from "@/components/UserProfileCard";
import { Box, Card, Typography, Alert, Stack } from "@mui/material"

export default function ProfileFriendList({ userFriends }: { userFriends: any }) {

    const renderUserFriends = userFriends.map((friend: any) => {
        const userFriend = friend.user
        return <UserProfileCard user={userFriend} />
    });

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
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ width: 1, p: 1 }}>
                {
                    emptyFriendList ? (
                        <Alert severity="info" sx={{ width: 1 }}>Sorry, you have no friends yet</Alert>
                    ) : renderUserFriends
                }
            </Stack>
        </Card>
    );
}