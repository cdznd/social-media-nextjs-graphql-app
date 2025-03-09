import Image from "next/image"
import Link from "next/link"
import { Avatar, Typography, Stack } from "@mui/material"
import { gray } from "../common/themePrimitives"
import { UserType } from "@/types/user"

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
                <Avatar
                    sx={{
                        width: 30,
                        height: 30,
                        position: 'relative',
                        border: '1px solid',
                        borderColor: gray[400]
                    }}
                >
                    <Image
                        src={author?.image}
                        fill={true}
                        alt={author?.name}
                        style={{ objectFit: 'contain' }}
                    />
                </Avatar>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {author.name}
                </Typography>
            </Stack>
        </Link>
    )
}