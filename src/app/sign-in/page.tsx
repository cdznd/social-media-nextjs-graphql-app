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
import CredentialsSigninForm from '@/components/common/CredentialsSigninForm';
import { GoogleIcon, SitemarkIcon } from '@/components/common/CustomIcons'
import ColorModeSelect from '@/components/shared-theme/ColorModeSelect';

export default function SignInPage() {
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
                        onClick={() => alert('Sign in with Google')}
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
            </Card>
        </AuthContainer>
    )
}