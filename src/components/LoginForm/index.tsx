import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { signInUserWithEmailAndPassword } from 'shared/constants/auth';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const [capsWarning, setCapsWarning] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  const handleSubmit = async () => {
    await signInUserWithEmailAndPassword(email, password);
    router.push('/');
    window.location.reload();
  };

  return (
    <MainCard
      sx={{
        maxWidth: { xs: 350, lg: 600 },
      }}
    >
      <Typography component="h4" variant="h4" sx={{ pb: 6 }}>
        Welcome ! Please sign in !
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Email Address</InputLabel>
            <OutlinedInput
              onChange={e => setEmail(e.target.value)}
              style={{}}
              id="email-login"
              type="email"
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              onChange={e => setPassword(e.target.value)}
              fullWidth
              color={capsWarning ? 'warning' : 'primary'}
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              onBlur={() => {
                setCapsWarning(false);
              }}
              onKeyDown={onKeyDown}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="primary"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {capsWarning && (
              <Typography
                variant="caption"
                sx={{ color: 'warning.main' }}
                id="warning-helper-text-password-login"
              >
                Caps lock on!
              </Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={stay}
                  onChange={event => setStay(event.target.checked)}
                  name="checked"
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="h6">Keep me sign in</Typography>}
            /> */}
            {/* <NextLink href="/forgot-password" passHref>
              <Typography variant="h6" color="text.primary">
                Forgot Password?
              </Typography>
            </NextLink> */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default LoginForm;
