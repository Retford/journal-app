import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { email, password, handleInputChange } = useForm({
    email: 'retford@gmail.com',
    password: '12134',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(checkingAuthentication(email, password));
  };

  const handleGoogleSignIn = () => {
    console.log('google');
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='crre@gmail.com'
              fullWidth
              name='email'
              value={email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='crre@gmail.com'
              fullWidth
              name='password'
              value={password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
