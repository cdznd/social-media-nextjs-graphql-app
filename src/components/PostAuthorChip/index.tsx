import Link from "next/link"
import { Typography, Stack } from "@mui/material"
import { gray } from "../common/themePrimitives"
import { UserType } from "@/types/user"
import UserAvatar from "../UserAvatar"

type PostAuthorChipProps = {
    author: UserType
}

export default async function PostAuthorChip(
    { author }: PostAuthorChipProps
) {
    return (
        <Link
            href={`/users/${author.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >   
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{
                    padding: 1,
                    paddingY: .5,
                    border: '1px solid',
                    borderColor: gray[700],
                    borderRadius: 4,
                    transition: '200ms',
                    '&:hover': {
                        borderColor: gray[300],
                    },
                }}
            >
                <UserAvatar
                    userImage={author?.image}
                    size={{
                        height: 30,
                        width: 30
                    }}
                />
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {author.username}
                </Typography>
            </Stack>
        </Link>
    )
}