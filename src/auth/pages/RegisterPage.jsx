import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { useState } from 'react';

const formData = {
  fullName: '',
  email: '',
  password: '',
};

const formValidations = {
  fullName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
  email: [(value) => value.includes('@'), 'El correo debe de tener @'],
  password: [
    (value) => value.length >= 6,
    'El password debe de tener más de 6 letras',
  ],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState,
    fullName,
    email,
    password,
    handleInputChange,
    fullNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log(formState);
  };

  return (
    <AuthLayout title='Register'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='Nombre Completo'
              fullWidth
              name='fullName'
              value={fullName}
              onChange={handleInputChange}
              error={!!fullNameValid && formSubmitted}
              helperText={fullNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='crre@gmail.com'
              fullWidth
              name='email'
              value={email}
              onChange={handleInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth type='submit'>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
