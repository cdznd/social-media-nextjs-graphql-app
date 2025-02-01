import { Box, Chip } from "@mui/material"
import Search from "@/components/Search";

export default function FeedHeader() {

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                width: '100%',
                justifyContent: 'space-between',
                alignItems: { xs: 'start', md: 'center' },
                gap: 4,
                overflow: 'auto',
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
            </Box>
        </Box>
    )
}

