import { Box, Card, CardContent, Avatar, Typography } from "@mui/material"

export default function ProfileFriendList({ userFriends }: { userFriends: any }) {

    const renderUserFriends = userFriends.map((friend: any) => {

        const userFriend = friend.user

        return (
            <Card
                key={userFriend.id}
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                }}
            >
                <Avatar
                    src={userFriend.image}
                    alt={userFriend.name}
                    sx={{ width: 50, height: 50 }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <Typography variant="h6">{userFriend.name}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Status: {friend.status.toLowerCase()}
                    </Typography>
                </CardContent>
            </Card>
        )
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