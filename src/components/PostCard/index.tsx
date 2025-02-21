"use client"
import { useState } from 'react';

import {
    Chip,
    Box,
    CardMedia,
    Avatar,
    Typography
} from '@mui/material';
import { gray } from '../common/themePrimitives';

import {
    StyledPostCard,
    StyledPostCardInfo,
    StyledPostCardContent,
    StyledTypography,
    StyledPostCardCategories
} from './style'

import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

import months from '@/utils/months';

import { PostData } from '@/types/post';

import PostEngagement from './PostEngagement';

type PostCardProps = {
    postData: PostData,
    variants?: string[]
}

export default function PostCard({ postData, variants = [] }: PostCardProps) {

    const author = postData?.author

    const createdAt = postData?.createdAt
    const creationDate = new Date(createdAt)


    const postVisibility = postData?.visibility

    const displayDate = `${creationDate.getDate()} ${months[creationDate.getMonth()]} ${creationDate.getFullYear()}`

    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

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

    const displayAuthor = !variants.includes('no-author')
    const displayImage = !variants.includes('no-media')

    const postLikes = postData?.likes ?? []
    const postComments = postData?.comments ?? []

    return (
        <StyledPostCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
        >
            {
                displayImage && postData?.thumbnail && (
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
            <Box>
                <StyledPostCardInfo>
                    {
                        displayAuthor && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 1,
                                    alignItems: 'center'
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
                        )
                    }
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {displayDate}
                    </Typography>
                </StyledPostCardInfo>
                <StyledPostCardContent>
                    <Box sx={{ mb: '1rem' }}>
                        <Chip
                            icon={postVisibility === 'PUBLIC' ? <PublicIcon /> : <LockIcon />}
                            color={postVisibility === 'PUBLIC' ? 'success' : 'info' }
                            variant='outlined'
                            label={postVisibility === 'PUBLIC' ? 'Public' : "Private"}
                            sx={{
                                p: 1
                            }}
                        />
                    </Box>
                    <StyledTypography color="text.secondary" gutterBottom>
                        {postData.content}
                    </StyledTypography>
                </StyledPostCardContent>
                <StyledPostCardCategories direction="row" spacing={2}>
                    {renderCategories}
                </StyledPostCardCategories>

                <PostEngagement
                    postId={postData?.id}
                    likes={postLikes}
                    comments={postComments}
                />

            </Box>
        </StyledPostCard>
    );

}