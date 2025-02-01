"use client"

import {
    Box,
    Button,
    Divider,
    Link,
    Typography
} from '@mui/material'
import CardAuth from '@/components/Authentication/AuthCard';
import AuthContainer from '@/components/Authentication/AuthContainer';
import CredentialsSignupForm from '@/components/Authentication/CredentialsSignupForm';
import { GoogleIcon, SitemarkIcon } from '@/components/common/CustomIcons';

import ColorModeSelect from '@/components/shared-theme/ColorModeSelect';

import { signIn } from 'next-auth/react';

export default function SignUpPage() {

    const handleSignUp = async () => {
        const result = await signIn('google', {
            callbackUrl: '/',
            redirect: true,
        });
        if (result?.error) {
            console.error(result.error);
        }
    };

    return (
        <AuthContainer direction="column" justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <CardAuth variant="outlined">
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
                        onClick={() => handleSignUp()}
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
            </CardAuth>
        </AuthContainer>
    );
}