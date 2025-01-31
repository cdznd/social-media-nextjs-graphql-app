import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';


const cardData = [
    {
        img: 'https://picsum.photos/800/450?random=1',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        description:
            'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        authors: [
            { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=2',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        description:
            'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=3',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        description:
            'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=4',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        description:
            "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=45',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        description:
            "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        authors: [
            { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=6',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        description:
            'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
    },
];

import { StyledCard, StyledCardContent, StyledTypography } from './style'

import FeedAuthor from '../FeedAuthor';

export default function FeedContent() {

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
        <Grid container spacing={2} columns={12}>
            <Grid size={{ xs: 12, md: 6 }}>
                <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(0)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={cardData[0].img}
                        sx={{
                            aspectRatio: '16 / 9',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                    <StyledCardContent>
                        <Typography gutterBottom variant="caption" component="div">
                            {cardData[0].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {cardData[0].title}
                        </Typography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {cardData[0].description}
                        </StyledTypography>
                    </StyledCardContent>
                    <FeedAuthor authors={cardData[0].authors} />
                </StyledCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(1)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={cardData[1].img}
                        aspect-ratio="16 / 9"
                        sx={{
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                    <StyledCardContent>
                        <Typography gutterBottom variant="caption" component="div">
                            {cardData[1].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {cardData[1].title}
                        </Typography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {cardData[1].description}
                        </StyledTypography>
                    </StyledCardContent>
                    <FeedAuthor authors={cardData[1].authors} />
                </StyledCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(2)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                    sx={{ height: '100%' }}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={cardData[2].img}
                        sx={{
                            height: { sm: 'auto', md: '50%' },
                            aspectRatio: { sm: '16 / 9', md: '' },
                        }}
                    />
                    <StyledCardContent>
                        <Typography gutterBottom variant="caption" component="div">
                            {cardData[2].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {cardData[2].title}
                        </Typography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {cardData[2].description}
                        </StyledTypography>
                    </StyledCardContent>
                    <FeedAuthor authors={cardData[2].authors} />
                </StyledCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
                >
                    <StyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(3)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                        sx={{ height: '100%' }}
                    >
                        <StyledCardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <div>
                                <Typography gutterBottom variant="caption" component="div">
                                    {cardData[3].tag}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {cardData[3].title}
                                </Typography>
                                <StyledTypography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {cardData[3].description}
                                </StyledTypography>
                            </div>
                        </StyledCardContent>
                        <FeedAuthor authors={cardData[3].authors} />
                    </StyledCard>
                    <StyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(4)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                        sx={{ height: '100%' }}
                    >
                        <StyledCardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <div>
                                <Typography gutterBottom variant="caption" component="div">
                                    {cardData[4].tag}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {cardData[4].title}
                                </Typography>
                                <StyledTypography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {cardData[4].description}
                                </StyledTypography>
                            </div>
                        </StyledCardContent>
                        <FeedAuthor authors={cardData[4].authors} />
                    </StyledCard>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(5)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                    sx={{ height: '100%' }}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={cardData[5].img}
                        sx={{
                            height: { sm: 'auto', md: '50%' },
                            aspectRatio: { sm: '16 / 9', md: '' },
                        }}
                    />
                    <StyledCardContent>
                        <Typography gutterBottom variant="caption" component="div">
                            {cardData[5].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {cardData[5].title}
                        </Typography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {cardData[5].description}
                        </StyledTypography>
                    </StyledCardContent>
                    <FeedAuthor authors={cardData[5].authors} />
                </StyledCard>
            </Grid>
        </Grid>
    )
}