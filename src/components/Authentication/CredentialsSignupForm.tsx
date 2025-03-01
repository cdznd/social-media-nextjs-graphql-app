"use client"
import { useState } from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Checkbox,
    Button,
} from "@mui/material"
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "@/fragments/mutations/mutations";
import { useRouter } from "next/navigation";
import ErrorAlert from "../ErrorAlert";

const CredentialsSignupForm = () => {

    const router = useRouter()
    const [createUser] = useMutation(CREATE_USER_MUTATION)

    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const [usernameError, setUsernameError] = useState<boolean>(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('')
    const [submitError, setSubmitError] = useState<boolean>(false)
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string>('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameError || emailError || passwordError) {
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);
        const result = await createUser({
            variables: {
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
                username: data.get('username')
            }
        })
        if(result?.errors) {
            console.error(result?.errors)
            setSubmitError(true)
            setSubmitErrorMessage('Error on the user creation')
        } else {
            router.push('/sign-in')
        }
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;
        let isValid = true;
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }
        return isValid;
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {
                submitError ? (
                    <ErrorAlert message={submitErrorMessage} />
                ) : null
            }
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
            <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="username">Create your unique username</FormLabel>
                <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    error={usernameError}
                    helperText={usernameErrorMessage}
                    color={usernameError ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
            >
                Sign up
            </Button>
        </Box>
    )
}

export default CredentialsSignupForm;