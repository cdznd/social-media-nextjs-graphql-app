"use client"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';

import Link from "next/link";
import Button from '@mui/material/Button';

import { GoogleIcon, SitemarkIcon } from '../../components/signin/Components/CustomIcons'

import Card from '@/components/common/card';
import AuthContainer from '@/components/common/AuthContainer';

import ColorModeSelect from '@/components/shared-theme/ColorModeSelect';
import CredentialsSigninForm from '@/components/common/CredentialsSigninForm';

export default function SignInPage() {
    return (
        <>
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

                    <Divider>or</Divider>
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
                                href="/material-ui/getting-started/templates/sign-in/"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </AuthContainer>
        </>
    )
}