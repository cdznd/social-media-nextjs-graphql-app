import UserProfileCard from "@/components/UserProfileCard";
import { Box, Card, CardContent, Avatar, Typography } from "@mui/material"

export default function ProfileFriendList({ userFriends }: { userFriends: any }) {

    const renderUserFriends = userFriends.map((friend: any) => {
        const userFriend = friend.user
        return <UserProfileCard user={userFriend} />
    });

    return (
        <Card sx={{
            p: 3,
            textAlign: "center",
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            boxShadow: 3,
            borderRadius: 2
        }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    Friends
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                gap: 2
            }}>
                {renderUserFriends}
            </Box>
        </Card>
    );
}