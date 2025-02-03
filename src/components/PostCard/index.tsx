"use client"
import { useState } from 'react';
import { Typography } from '@mui/material';
import FeedPostInfo from '../Feed/FeedPostInfo';
import CardMedia from '@mui/material/CardMedia';
import { StyledPostCard, StyledPostCardContent, StyledTypography } from './style'

type PostCardProps = {
    postData: any,
    variation?: string
}

export default function PostCard({ postData, variation }: PostCardProps) {

    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <StyledPostCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            sx={variation === 'small' ? { height: '100%' } : {}}
        >
            {
                (postData?.thumbnail || variation === 'no-media') && (
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
            <FeedPostInfo
                author={postData.author}
                createdAt={postData.createdAt}
            />
            <StyledPostCardContent>
                <StyledTypography color="text.secondary" gutterBottom>
                    {postData.content}
                </StyledTypography>
            </StyledPostCardContent>
        </StyledPostCard>
    );

}