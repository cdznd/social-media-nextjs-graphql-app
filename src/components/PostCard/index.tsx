"use client"
import { useState } from 'react';
import {
    Chip,
    Box,
    CardMedia
} from '@mui/material';

import {
    StyledPostCard,
    StyledPostCardInfo,
    StyledPostCardContent,
    StyledTypography,
    StyledPostCardCategories
} from './style'

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';

import months from '@/utils/months';

import { PostData } from '@/types/post';
import { gray } from '../common/themePrimitives';

type PostCardProps = {
    postData: PostData,
    variant?: string
}

export default function PostCard({ postData, variant }: PostCardProps) {

    const author = postData?.author

    const createdAt = postData?.createdAt
    const creationDate = new Date(createdAt)
    const displayDate = `${creationDate.getDay()} ${months[creationDate.getMonth()]} ${creationDate.getFullYear()}`

    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const renderCategories =
        postData?.categories.length > 0 ?
            postData?.categories.map(category => {
                return (
                    <Chip
                        variant="filled"
                        label={category?.name}
                    />
                )
            }) : null

    return (
        <StyledPostCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
        >
            {
                (postData?.thumbnail || variant === 'no-media') && (
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
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {displayDate}
                    </Typography>
                </StyledPostCardInfo>
                <StyledPostCardContent>
                    <StyledTypography color="text.secondary" gutterBottom>
                        {postData.content}
                    </StyledTypography>
                </StyledPostCardContent>
                <StyledPostCardCategories direction="row" spacing={2}>
                    {renderCategories}
                </StyledPostCardCategories>
            </Box>
        </StyledPostCard>
    );

}