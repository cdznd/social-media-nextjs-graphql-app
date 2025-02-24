import { Avatar, Card, CardContent, Typography, Button, Box, Stack } from "@mui/material";
import { display } from "@mui/system";
import FriendshipTriggerButton from "../FriendshipTriggerButton";
import { UserType } from "@/types/user";

import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

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
    <Card sx={{ p: 3, textAlign: "center", mb: 4, display: "flex", justifyContent: "start", flex: 1 }}>

      <Avatar src={user.image} alt={user.name} sx={{ width: 100, height: 100 }} />

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