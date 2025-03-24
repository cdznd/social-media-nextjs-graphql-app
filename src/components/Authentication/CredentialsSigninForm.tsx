'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  Divider,
  Stack
} from "@mui/material";
import { GoogleIcon } from "../common/CustomIcons";
import ErrorAlert from "../ErrorAlert";
import SpinnerLoading from "../Loading/Spinner";

const CredentialsSigninForm = () => {

  const router = useRouter()

  // Error states
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('')

  // Pending state
  const [isLoginPending, setIsLoginPending] = useState<boolean>(false)

  // client side validation
  const validateInputs = (formData: FormData) => {
    let isValid = true;
    const username: string = (formData.get('username') as string) ?? ''
    const password: string = (formData.get('password') as string) ?? ''
    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage('Please enter a valid username address.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }
    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter a valid password.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  // Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoginPending(true)
    // Transform into FormData
    const formData = new FormData(event.currentTarget);
    if (!validateInputs(formData)) {
      return;
    }
    // NextAuth SignIn
    try {
      const result = await signIn(
        'credentials',
        {
          username: formData.get('username'),
          password: formData.get('password'),
          redirect: false
        }
      )
      if (result?.error) {
        setLoginError(true);
        setLoginErrorMessage(result.error);
      } else {
        router.push("/"); // Redirect only on success
      }
    } finally {
      setIsLoginPending(false)
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: '/',
      redirect: true,
    });
    if (result?.error) {
      console.error(result.error);
    }
  };

  if ((isLoginPending)) return (
    <Box sx={{ my: 4 }}>
      <Stack direction='column' alignItems='center'>
        <Typography
          variant='h5'
          color='text.primary'>
          Logging ...
        </Typography>
        <Box sx={{ width: '100%', mt: 4 }}>
          <SpinnerLoading />
        </Box>
      </Stack>
    </Box>
  )

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {loginError ? <ErrorAlert message={loginErrorMessage} /> : null}
      {/* Username */}
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextField
          error={usernameError}
          helperText={usernameErrorMessage}
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={usernameError ? 'error' : 'primary'}
        />
      </FormControl>
      {/* Password */}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={false}
      >
        Sign in
      </Button>
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
      </Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleGoogleSignIn()}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            style={{
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default CredentialsSigninForm;