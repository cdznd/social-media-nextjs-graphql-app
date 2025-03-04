import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Stack 
} from '@mui/material';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          my: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Welcome to Social Connect
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
        >
          Connect, Share, and Explore with Our Social Media Platform
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ mt: 4 }}
        >
          <Link href="/sign-in" passHref>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
            >
              Sign In
            </Button>
          </Link>
          
          <Link href="/sign-up" passHref>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}