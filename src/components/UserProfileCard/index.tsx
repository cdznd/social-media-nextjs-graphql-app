import { Card, CardContent, Avatar, Typography } from "@mui/material"
import Link from "next/link";

type UserProfileCardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}

export default function UserProfileCard({ user }: UserProfileCardProps) {

  return (
    <Card
      key={user.id}
      sx={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Avatar
        src={user.image}
        alt={user.name}
        sx={{ width: 50, height: 50 }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <Link href={`users/${user.id}`} passHref>
          <Typography variant="h6">
            {user.name}
          </Typography>
        </Link>
        {/* <Typography variant="body1" color="text.secondary">
          Status: {.status.toLowerCase()}
        </Typography> */}
      </CardContent>
    </Card>
  )

}