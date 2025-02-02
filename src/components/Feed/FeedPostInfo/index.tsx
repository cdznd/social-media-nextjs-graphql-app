import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FeedPostInfo({ author, createdAt }: { author: { id: string, image: string; name: string }, createdAt: string }) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const creationDate = new Date(createdAt)
    const displayDate = `${creationDate.getDay()} ${months[creationDate.getMonth()]} ${creationDate.getFullYear()}`

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    <Avatar
                        alt={author.name}
                        src={author.image}
                        sx={{ width: 24, height: 24 }}
                    />
                </AvatarGroup>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {author.name}
                </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {displayDate}
            </Typography>
        </Box>
    );
}