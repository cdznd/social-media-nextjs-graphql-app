"use client"
import { useState } from 'react';
import { Typography } from '@mui/material';
import FeedPostInfo from '../FeedPostInfo';
import CardMedia from '@mui/material/CardMedia';
import { StyledCard, StyledCardContent, StyledTypography } from '../FeedPost/style'

export default function ({ cardData, variation }: { cardData: any, variation?: string }) {

    console.log('card data here')
    console.log(cardData)

    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const cardMediaClass =
        variation === 'small' ? {
            height: { sm: 'auto', md: '50%' },
            aspectRatio: { sm: '16 / 9', md: '' },
        } : {
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
        }

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
                variation !== 'no-media' ? (
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={'https://picsum.photos/800/450?random=1'}
                        sx={cardMediaClass}
                    />
                ) : <></>
            }
            <FeedPostInfo 
                author={cardData.author}
                createdAt={cardData.createdAt}
            />
            <StyledCardContent>
                {/* <Typography gutterBottom variant="caption" component="div">
                    {cardData?.tag}
                </Typography> */}
                <StyledTypography color="text.secondary" gutterBottom>
                    {cardData.content}
                </StyledTypography>
            </StyledCardContent>
        </StyledCard >
    );

}