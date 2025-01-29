import { useState } from "react";
import { 
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Button,
    Link,
    Checkbox
} from "@mui/material";

const CredentialsSigninForm = () => {

    const [emailError, setEmailError] = useState('error')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')

    const [passwordError, setPasswordError] = useState('error')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    const handleSubmit = () => {

    }

    const validateInputs = () => {

    }

    const handleClickOpen = () => {
        
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}
        >
            <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={passwordError ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
            >
                Sign in
            </Button>
            <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
            >
                Forgot your password?
            </Link>
        </Box>
    )
}

export default CredentialsSigninForm;