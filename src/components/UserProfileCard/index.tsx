import Link from "next/link";
import { Box, Card, CardContent, Typography } from "@mui/material"
import { brand } from "../common/themePrimitives";
import FriendshipTriggerButton from "../FriendshipTriggerButton";
import { UserProfileCardProps } from "@/types/user";
import UserAvatar from "../UserAvatar";

export default function UserProfileCard(
  { user }: UserProfileCardProps
) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        p: '1rem',
      }}
    >
      <UserAvatar
        userImage={user?.image} />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <Box sx={{
          marginBottom: '1.5rem',
          width: 1,
          textAlign: 'center'
        }}>
          <Link
            href={`/users/${user.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography 
              variant="h6"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                transition: '100ms',
                '&:hover': {
                  color: brand[400]
                }
              }}>{user.name}</Typography>
          </Link>
        </Box>
        <FriendshipTriggerButton
          toUserId={user.id}
        />
      </CardContent>
    </Card>
  )
}