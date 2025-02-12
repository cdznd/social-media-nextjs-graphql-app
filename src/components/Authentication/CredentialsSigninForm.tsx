import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Button,
  Checkbox
} from "@mui/material";
import ErrorAlert from "../ErrorAlert";

const CredentialsSigninForm = () => {

  const router = useRouter()

  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    // NextAuth SignIn
    const result = await signIn('credentials',
      {
        username: data.get('username'),
        password: data.get('password'),
        redirect: false
      }
    )
    if (result?.error) {
      setLoginError(true)
      setLoginErrorMessage(result?.error)
    } else {
      router.push('/app')
    }
  };

  const validateInputs = () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    let isValid = true;
    if (!username.value) {
      setUsernameError(true);
      setUsernameErrorMessage('Please enter a valid username address.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

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
      {loginError ? <ErrorAlert message={loginErrorMessage} /> : null }
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
    </Box>
  )
}

export default CredentialsSigninForm;