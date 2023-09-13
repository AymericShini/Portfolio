'use client';

import { Grid } from '@mui/material';
import LoginForm from 'components/LoginForm';

export default function Login() {
  return (
    <div className="sign-in-container">
      <Grid
        container
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        rowGap={4}
        sx={{
          backgroundImage: `url('/img/bg/bg-auth.png')`,
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          pt: 15,
        }}
      >
        {/* <Grid item>
          <LogoAD fill="red" width={40} height={40} />
        </Grid> */}
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
}
