'use client'

import {
    Chip,
    Box,
    CardMedia,
    Avatar,
    Typography,
    Stack
} from '@mui/material';

import Image from 'next/image';
import Link from 'next/link';

import { gray } from '../common/themePrimitives';

import {
    StyledPostCard,
    StyledPostCardInfo,
    StyledPostCardContent,
    StyledTypography,
    StyledPostCardCategories
} from './style'

import { brand } from '../common/themePrimitives';

import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

import months from '@/utils/months';

import { PostType } from '@/types/post';

import PostEngagement from './PostEngagement';

type PostCardProps = {
    postData: PostType,
    variants?: string[],
    position?: number
}

export default function PostCard({ postData, variants = [], position }: PostCardProps) {

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
                        size='medium'
                    />
                )
            }) : null

    // min-info variation does not include image, engagement, or categories
    const minInfo = variants.includes('min-info')
    const disabledEngagement = variants.includes('disable-user-engagement')

    const postLikes = postData?.likes ?? []
    const postComments = postData?.comments ?? []

    /**
     * When using the property fill from next/image you should have a relative component with a defined height.
     */
    const postImageHeight = 400

    return (
        <StyledPostCard
            variant="outlined"
            tabIndex={0}
        >
            {
                (postData?.thumbnail) && (
                    <CardMedia sx={{ height: postImageHeight, position: 'relative' }}>
                        <Image
                            src={postData?.thumbnail}
                            fill
                            alt={postData?.title}
                            style={{ objectFit: 'cover' }} // Ensures proper scaling
                            priority={position ? position <= 2 : false}
                        />
                    </CardMedia>
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
                                    sx={{ 
                                        width: 24,
                                        height: 24,
                                        border: '1px solid',
                                        borderColor: gray[400]
                                    }}
                                >
                                    <Image
                                        src={author.image}
                                        width={24}
                                        height={24}
                                        alt={postData?.title}
                                        quality={75}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Avatar>
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
                {
                    !minInfo ? (
                        <Link href={`/post/${postData.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant='h6' sx={{ '&:hover': { color: 'red' }}}>{postData.title}</Typography>
                        </Link>
                    ) : (
                        <Link href={`/post/${postData.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant='body2' sx={{ fontWeight: 'bold', textAlign: 'start', mb: 1 }}>{postData.title}</Typography>
                        </Link>
                    )
                }
                <StyledTypography color="text.secondary" gutterBottom>
                    {postData.content}
                </StyledTypography>
            </StyledPostCardContent>

            <Box sx={{ flexGrow: 1 }}></Box>

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
                isDisabled={disabledEngagement}
            />
        </StyledPostCard>
    );

}