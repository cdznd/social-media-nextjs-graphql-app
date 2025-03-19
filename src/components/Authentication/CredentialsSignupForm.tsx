'use client'
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    Button,
} from "@mui/material"
import { CREATE_USER_MUTATION } from "@/fragments/mutations/mutations";
import { useRouter } from "next/navigation";
import ErrorAlert from "../ErrorAlert";

const CredentialsSignupForm = () => {

    const router = useRouter()
    const [createUser] = useMutation(CREATE_USER_MUTATION)

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
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Transform into FormData
        const formData = new FormData(event.currentTarget);
        if(!validateInputs(formData)) {
            return;
        }
        // Mutation
        const result = await createUser({
            variables: {
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
                username: data.get('username')
            }
        })
        if (result?.errors) {
            setSubmitError(true)
            setSubmitErrorMessage('Error on the user creation')
        } else {
            router.push('/sign-in')
        }
    };

    return (
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
    )
}

export default CredentialsSignupForm;