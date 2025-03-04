import { Box, Card, CardContent, Avatar, Typography } from "@mui/material"
import { brand } from "../common/themePrimitives";

import FriendshipTriggerButton from "../FriendshipTriggerButton";

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
  return (
    <Card
      key={user.id}
      sx={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        p: '1rem',
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
        <FriendshipTriggerButton
          toUserId={user.id}
        />
      </CardContent>

    </Card>
  )

}