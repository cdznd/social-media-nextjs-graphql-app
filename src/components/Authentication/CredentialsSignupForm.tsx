'use client'
import { useState, useEffect, useActionState, useTransition } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Box,
    Stack,
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Divider
} from "@mui/material"
import { signUp } from "./actions";
import ErrorAlert from "../ErrorAlert";
import SpinnerLoading from "../Loading/Spinner";
import { validateEmailFormat } from "@/utils/email";
import { GoogleIcon } from "../common/CustomIcons";

export default function CredentialsSignupForm() {

    const router = useRouter()

    // Server action
    const [isPending, startTransition] = useTransition()
    const initialState = {
        success: false,
        message: ''
    }

    const [state, formAction, pending] = useActionState(signUp, initialState)

    // Error states
    // Name
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
    // Email
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    // Password
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    // Username
    const [usernameError, setUsernameError] = useState<boolean>(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('')
    // Submit
    const [submitError, setSubmitError] = useState<boolean>(false)
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string>('')

    useEffect(() => {
        if (!pending && state?.success) {
            router.push('/sign-in');
        }
        if(!pending && !state?.success && state.message) {
            setSubmitError(true)
            setSubmitErrorMessage(state.message)
        }
    }, [pending, state?.success, router]);

    const validateInputs = (formData: FormData) => {
        let isValid = true;
        const name: string = (formData.get('name') as string) ?? ''
        const email: string = (formData.get('email') as string) ?? ''
        const password: string = (formData.get('password') as string) ?? ''
        const username: string = (formData.get('username') as string) ?? ''
        if (!name || name.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }
        if (!email || !validateEmailFormat(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
        if (!username) {
            setUsernameError(true);
            setUsernameErrorMessage('Invalid username.')
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }
        setSubmitError(false)
        setSubmitErrorMessage('')
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Transform into FormData
        const formData = new FormData(event.currentTarget);
        if (!validateInputs(formData)) {
            return;
        }
        startTransition(() => {
            formAction(formData)
        })
    };

    const handleGoogleSignUp = async () => {
        const result = await signIn('google', {
            callbackUrl: '/',
            redirect: true,
        });
        if (result?.error) {
            console.error(result.error);
        }
    };

    if ((pending && !state?.success)) return (
        <Box sx={{ my: 4 }}>
            <Stack direction='column' alignItems='center'>
                <Typography
                    variant='h5'
                    color='text.primary'>
                    Creating User
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <SpinnerLoading />
                </Box>
            </Stack>
        </Box>
    )

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                {submitError ? <ErrorAlert message={submitErrorMessage} /> : null}
                {/* Name */}
                <FormControl>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? 'error' : 'primary'}
                    />
                </FormControl>
                {/* Email */}
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                {/* Password */}
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••••••••••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                {/* Username */}
                <FormControl sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    mt: 1,
                    backgroundColor: 'background.paper'
                }}>
                    <FormLabel
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                        htmlFor="username">
                        Create your unique username.
                    </FormLabel>
                    <TextField
                        name="username"
                        id="username"
                        placeholder="Username"
                        required
                        fullWidth
                        error={usernameError}
                        helperText={usernameErrorMessage}
                        color={usernameError ? 'error' : 'primary'}
                    />
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={false}
                >
                    Sign up
                </Button>
            </Box>
            <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Stack direction="column" spacing={2}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleGoogleSignUp()}
                    startIcon={<GoogleIcon />}
                >
                    Sign up with Google
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link
                        href="/sign-in"
                        style={{
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Stack>
        </>
    )
}
