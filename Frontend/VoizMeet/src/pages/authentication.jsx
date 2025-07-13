import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Typography,
  Snackbar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername('');
        setPassword('');
        setName('');
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left side with background image */}
       <Box
  sx={{
    flex: 1,
    backgroundColor: 'black',
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    color: 'error.main', // MUI red
    textAlign: 'center',
    p: 3,
  }}
>
  <Box>
    <Typography variant="h4" fontWeight="bold" gutterBottom  sx={{ color: 'error.main' }}>
      Welcome to VoizMeet
    </Typography>
    <Typography variant="body1">
      Connect, collaborate, and communicate seamlessly.
    </Typography>
  </Box>
</Box>


        {/* Right side with the form */}
        <Paper
          elevation={6}
          square
          sx={{
            flex: 1,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              width: '100%',
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'error' }}>
              <LockOutlinedIcon />
            </Avatar>

            {/* Toggle Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant={formState === 0 ? 'contained' : 'outlined'}
                color={formState === 0 ? 'error' : 'black'}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>

              <Button
                variant={formState === 1 ? 'contained' : 'outlined'}
                color={formState === 1 ? 'error' : 'black'}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form Fields */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              {/* Submit Button */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="error" // Always red
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
