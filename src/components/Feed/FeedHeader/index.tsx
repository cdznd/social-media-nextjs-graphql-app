import { Box, Chip, Typography } from "@mui/material"
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import IconButton from '@mui/material/IconButton';
import Search from "@/components/Search";

export default function FeedHeader() {

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    return (
        <>
            <div>
                <Typography variant="h1" gutterBottom>
                    Blog
                </Typography>
                <Typography>Stay in the loop with the latest about our products</Typography>
            </div>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'start', md: 'center' },
                    gap: 4,
                    overflow: 'auto',
                    background: 'red'
                }}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 3,
                        overflow: 'auto',
                    }}
                >
                    <Chip onClick={handleClick} size="medium" label="All categories" />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Company"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Product"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Design"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Engineering"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'row',
                        gap: 1,
                        width: { xs: '100%', md: 'fit-content' },
                        overflow: 'auto',
                    }}
                >
                    <Search />
                    <IconButton size="small" aria-label="RSS feed">
                        <RssFeedRoundedIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

