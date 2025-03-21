import {
    Typography,
    Stack,
    Card
} from '@mui/material'
import CredentialsSignupForm from '@/components/Authentication/CredentialsSignupForm';
import { SitemarkIcon } from '@/components/common/CustomIcons';
import ColorModeSelect from '@/components/common/ColorModeSelect';

export default function SignUpPage() {

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
                height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                minHeight: '100%',
                padding: 2,
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    zIndex: -1,
                    inset: 0,
                    backgroundImage:
                        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                    backgroundRepeat: 'no-repeat',
                },
            }}    
        >
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'center',
                    overflowY: 'scroll',
                    width: '100%',
                    maxWidth: '500px',
                    padding: 4,
                    gap: 2,
                    margin: 'auto',
                    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
                }}    
            >
                <SitemarkIcon />
                <Typography
                    component="h1"
                    variant="h4"
                >
                    Sign Up
                </Typography>
                <CredentialsSignupForm />
            </Card>
        </Stack>
    );
}