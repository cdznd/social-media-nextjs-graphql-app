"use client"
import { useState } from 'react';
import { Typography } from '@mui/material';
import FeedPostInfo from '../FeedPostInfo';
import CardMedia from '@mui/material/CardMedia';
import { StyledCard, StyledCardContent, StyledTypography } from '../FeedPost/style'

export default function ({ cardData, variation }: { cardData: any, variation?: string }) {

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
        <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            sx={variation === 'small' ? { height: '100%' } : {}}
        >
            {
                cardData?.thumbnail && (
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={cardData?.thumbnail ?? ''}
                        sx={{
                            aspectRatio: '16 / 9',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                )
            }
            <FeedPostInfo
                author={cardData.author}
                createdAt={cardData.createdAt}
            />
            <StyledCardContent>
                <StyledTypography color="text.secondary" gutterBottom>
                    {cardData.content}
                </StyledTypography>
            </StyledCardContent>
        </StyledCard >
    );

}