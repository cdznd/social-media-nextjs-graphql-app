"use client"

import {
    Box,
    Button,
    Divider,
    Link,
    Typography
} from '@mui/material'
import Card from '@/components/common/card';
import AuthContainer from '@/components/common/AuthContainer';
import CredentialsSignupForm from '@/components/common/CredentialsSignupForm';
import { GoogleIcon, SitemarkIcon } from '@/components/common/CustomIcons';
import ColorModeSelect from '@/components/shared-theme/ColorModeSelect';

export default function SignUpPage() {
    return (
        <AuthContainer direction="column" justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Card variant="outlined">
                <SitemarkIcon />
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign up
                </Typography>
                <CredentialsSignupForm />
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Sign up with Google')}
                        startIcon={<GoogleIcon />}
                    >
                        Sign up with Google
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link
                            href="/sign-in/"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </AuthContainer>
    );
}