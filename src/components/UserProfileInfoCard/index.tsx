import { Avatar, Card, CardContent, Typography } from "@mui/material";

type UserProfileCardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export default function UserProfileInfoCard({ user }: UserProfileCardProps) {
  return (
    <Card sx={{ p: 3, textAlign: "center", mb: 4, display: "flex", justifyContent: "start", flex: 1 }}>
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