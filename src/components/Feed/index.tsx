import Box from '@mui/material/Box';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedContent from '@/components/Feed/FeedContent';

export default function Feed() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FeedHeader />
      <FeedContent />
    </Box>
  );
}
