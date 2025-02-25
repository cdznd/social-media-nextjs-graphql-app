"use client"
import {
    Chip,
    Box,
    CardMedia,
    Avatar,
    Typography,
    Stack
} from '@mui/material';
import { gray } from '../common/themePrimitives';

import {
    StyledPostCard,
    StyledPostCardInfo,
    StyledPostCardContent,
    StyledTypography,
    StyledPostCardCategories
} from './style'

import Link from 'next/link';

import { brand } from '../common/themePrimitives';

import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

import months from '@/utils/months';

import { PostType } from '@/types/post';

import PostEngagement from './PostEngagement';

type PostCardProps = {
    postData: PostType,
    variants?: string[]
}

export default function PostCard({ postData, variants = [] }: PostCardProps) {

    const author = postData?.author
    const createdAt = postData?.createdAt
    const creationDate = new Date(createdAt)
    const displayDate = `${creationDate.getDate()} ${months[creationDate.getMonth()]} ${creationDate.getFullYear()}`

    const postVisibility = postData?.visibility

    // TODO: Add a click to send to the category filter feed
    const renderCategories =
        postData?.categories && postData?.categories.length > 0 ?
            postData?.categories.map(category => {
                return (
                    <Chip
                        key={category?.name}
                        variant="filled"
                        label={category?.name}
                    />
                )
            }) : null

    // min-info variation does not include image, engagement, or categories
    const minInfo = variants.includes('min-info')

    const postLikes = postData?.likes ?? []
    const postComments = postData?.comments ?? []

    return (
        <StyledPostCard
            variant="outlined"
            tabIndex={0}
        >
            {
                (postData?.thumbnail) && (
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={postData?.thumbnail ?? ''}
                        sx={{
                            aspectRatio: '16 / 9',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                )
            }

            <StyledPostCardInfo>
                {
                    !minInfo && (
                        <Link href={`/users/${author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 1,
                                    alignItems: 'center',
                                    paddingY: '.3rem',
                                    paddingX: '.5rem',
                                    border: '1px solid',
                                    borderColor: gray[700],
                                    borderRadius: '1rem',
                                    transition: '200ms',
                                    '&:hover': {
                                        background: brand[800]
                                    },
                                }}
                            >
                                <Avatar
                                    alt={author.name}
                                    src={author.image}
                                    sx={{ width: 24, height: 24, border: '1px solid', borderColor: gray[600] }}
                                />
                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                    {author.name}
                                </Typography>
                            </Box>
                        </Link>
                    )
                }
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {displayDate}
                </Typography>
            </StyledPostCardInfo>

            <StyledPostCardContent>
                <Stack direction="row" sx={{ mb: 2 }}>
                    <Chip
                        icon={postVisibility === 'PUBLIC' ? <PublicIcon /> : <LockIcon />}
                        color={postVisibility === 'PUBLIC' ? 'success' : 'info'}
                        variant='outlined'
                        label={postVisibility === 'PUBLIC' ? 'Public' : "Private"}
                        sx={{
                            p: 1
                        }}
                    />
                </Stack>
                <StyledTypography color="text.secondary" gutterBottom>
                    {postData.content}
                </StyledTypography>
            </StyledPostCardContent>

            {
                !minInfo && (
                    <StyledPostCardCategories direction="row" spacing={2}>
                        {renderCategories}
                    </StyledPostCardCategories>
                )
            }

            <PostEngagement
                postId={postData?.id}
                likes={postLikes}
                comments={postComments}
            />
        </StyledPostCard>
    );

}