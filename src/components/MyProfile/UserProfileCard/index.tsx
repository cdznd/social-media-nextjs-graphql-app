import { Avatar, Card, CardContent, Typography } from "@mui/material";

interface UserProfileCardProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Card sx={{ p: 3, textAlign: "center", mb: 4, display: "flex", justifyContent: "start" }}>
      <Avatar src={user.image} alt={user.name} sx={{ width: 100, height: 100 }} />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
