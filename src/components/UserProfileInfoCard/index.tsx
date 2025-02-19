import { Avatar, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { display } from "@mui/system";
import FriendshipTriggerButton from "../FriendshipTriggerButton";

type UserProfileCardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  displayFriendshipButton: boolean,
}

export default function UserProfileInfoCard(
  { user, displayFriendshipButton }: UserProfileCardProps) {

  const sendFriendRequest = () => {

  }

  return (
    <Card sx={{ p: 3, textAlign: "center", mb: 4, display: "flex", justifyContent: "start", flex: 1 }}>

      <Avatar src={user.image} alt={user.name} sx={{ width: 100, height: 100 }} />

      <CardContent sx={{ display: "flex", alignItems: "start", justifyContent: "space-between", width: 1 }}>

        <Box sx={{ display: "flex", alignItems: "start", flexDirection: "column" }}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        {
          displayFriendshipButton && (
            <Box>
              <FriendshipTriggerButton
                toUserId={user.id}
              />
            </Box>
          )
        }

      </CardContent>

    </Card>
  );
};