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

const CredentialsSignupForm = () => {

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

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

    // const [createUser] = useMutation()

    const handleCredentialsSignUp = async (formData: FormData) => {
        const response = await fetch('api/auth/signup', {
            method: 'POST',
            body: formData
        })
        const result = await response.json()
        if(!response.ok) {
            console.error('Error on signup')
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameError || emailError || passwordError) {
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);
        await handleCredentialsSignUp(data)
        console.log({
            name: data.get('name'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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