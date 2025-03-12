import { Avatar, Card, CardContent, Typography, Box, Stack } from "@mui/material";
import FriendshipTriggerButton from "../FriendshipTriggerButton";
import { UserType } from "@/types/user";

import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

import UserAvatar from "../UserAvatar";

type UserProfileCardProps = {
  user: UserType;
  displayFriendshipButton: boolean,
  isFriend?: boolean,
  isCurrentUser?: boolean,
  generalInfo: {
    friends?: number,
    privatePosts?: number,
    publicPosts?: number
  }
}

export default function UserProfileInfoCard(
  { user, displayFriendshipButton, isFriend, isCurrentUser, generalInfo }: UserProfileCardProps) {
  return (
    <Card sx={{ display: "flex", justifyContent: "start", textAlign: "center", flex: 1, mb: 4, p: 3 }}>
      <UserAvatar
        userImage={user?.image}
        size={{
          height: 100,
          width: 100
        }}
      />
      <CardContent sx={{ display: "flex", alignItems: "start", justifyContent: "space-between", width: 1 }}>
        <Stack direction="column" alignItems="start">
          <Typography variant="h5">{user.name}</Typography>
          {
            (isFriend || isCurrentUser) && (<>
              <Typography variant="body2" color="text.secondary">
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </>
            )
          }
          <Stack direction="row" alignItems="center" spacing={1} marginTop={1}>
            <Stack direction="row" alignItems="center" spacing={.5}>
              <PeopleIcon />
              <Typography variant="body2" color="text.secondary">
                {generalInfo?.friends ?? 0}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={.5}>
              <PublicIcon />
              <Typography variant="body2" color="text.secondary">
                {generalInfo.publicPosts ?? 0}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={.5}>
              <LockIcon />
              <Typography variant="body2" color="text.secondary">
                {generalInfo.privatePosts ?? 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
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