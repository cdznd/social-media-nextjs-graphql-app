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
import CredentialsSigninForm from '@/components/Authentication/CredentialsSigninForm';
import { GoogleIcon, SitemarkIcon } from '@/components/Common/CustomIcons'
import ColorModeSelect from '@/components/shared-theme/ColorModeSelect';

import { signIn } from 'next-auth/react';

export default function SignInPage() {

    const handleSignIn = async () => {
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
                    Sign in
                </Typography>
                <CredentialsSigninForm />
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleSignIn()}
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/sign-up/"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </CardAuth>
        </AuthContainer>
    )
}