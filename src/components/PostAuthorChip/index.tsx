
import Image from "next/image"
import Link from "next/link"

import { UserType } from "@/types/user"

import { Box, Avatar, Typography, Stack } from "@mui/material"

import { gray, brand } from "../common/themePrimitives"

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
                    px: 1.5,
                    py: 1,
                    border: '1px solid',
                    borderColor: gray[700],
                    borderRadius: 4,
                    transition: '200ms',
                    '&:hover': {
                        borderColor: gray[300]
                    },
                }}
            >
                <Avatar
                    sx={{
                        width: 24,
                        height: 24,
                        position: 'relative',
                        border: '1px solid',
                        borderColor: gray[400]
                    }}
                >
                    <Image
                        src={author.image}
                        fill={true}
                        alt={author?.name}
                        quality={75}
                        style={{ objectFit: 'cover' }}
                    />
                </Avatar>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {author.name}
                </Typography>
            </Stack>
        </Link>
    )
}