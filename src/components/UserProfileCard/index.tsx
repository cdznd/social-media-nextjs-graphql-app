import { Box, Card, CardContent, Avatar, Typography } from "@mui/material"
import { brand } from "../common/themePrimitives";
import FriendshipTriggerButton from "../FriendshipTriggerButton";
import { UserProfileCardProps } from "@/types/user";
import Image from "next/image";

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
      <Avatar
        sx={{
          width: 75,
          height: 75,
          border: '1px solid',
          borderColor: brand[400]
        }}
      >
        <Image
          src={user.image}
          fill={true}
          alt={user?.name}
          priority={true}
          quality={75}
          style={{ objectFit: 'cover' }}
        />
      </Avatar>
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