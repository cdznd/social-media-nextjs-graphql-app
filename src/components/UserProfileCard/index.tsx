
import Link from "next/link";
import { fetchGraphQLData } from "@/lib/apollo-client/apolloFetcher";
import { GET_FRIENDSHIP } from "@/fragments/queries/friendship";
import { Box, Card, CardContent, Typography } from "@mui/material"
import { brand } from "../common/themePrimitives";
import FriendshipTriggerButton from "../FriendshipTriggerButton";
import UserAvatar from "../UserAvatar";
import { UserType } from "@/types/user";

async function getUserFriendshipData(userId: string, loggedUserId: string) {
  const data = await fetchGraphQLData(
    GET_FRIENDSHIP,
    {
      fromUserId: loggedUserId,
      toUserId: userId
    }
  )
  return data
}

type UserProfileCardProps = {
  user: UserType,
  loggedUserId: string
}

export default async function UserProfileCard(
  { user, loggedUserId }: UserProfileCardProps
) {
  const data = await getUserFriendshipData(user.id, loggedUserId)
  const friendshipData = data?.friendship
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
          friendshipData={friendshipData}
          loggedUserId={loggedUserId}
          userId={user.id}
        />
      </CardContent>
    </Card>
  )
}