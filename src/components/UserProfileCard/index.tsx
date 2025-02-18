import { Box, Card, CardContent, Avatar, Typography, Button } from "@mui/material"
import Link from "next/link";
import { brand } from "../common/themePrimitives";

type UserProfileCardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}

export default function UserProfileCard(
  { user }: UserProfileCardProps
) {

  const isFriend = true
  // False if don't have a friendship status
  const friendshipStatus = 'PENDING'

  return (
    <Card
      key={user.id}
      sx={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        p: '1rem',
        flex: 1
      }}
    >

      <Avatar
        src={user.image}
        alt={user.name}
        sx={{ width: 75, height: 75 }}
      />

      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>

        <Box sx={{
          marginBottom: '2rem',
          width: 1,
          textAlign: 'center'
        }}>
          <Box
            component={'a'}
            href={`users/${user.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              transition: '100ms',
              '&:hover': {
                color: brand[400]
              }
            }}
          >
            <Typography variant="h6" sx={{ textDecoration: 'none' }}>
              {user.name}
            </Typography>
          </Box>
        </Box>

        <Button
          variant={friendshipStatus === 'PENDING' ? 'outlined' : 'contained'}
          color={friendshipStatus === 'PENDING' ? undefined : 'primary'}
          sx={{
            width: 1,
          }}
        >
          {friendshipStatus === 'PENDING' ? 'Pending' : 'Add Friend'}
        </Button>

      </CardContent>

    </Card>
  )

}