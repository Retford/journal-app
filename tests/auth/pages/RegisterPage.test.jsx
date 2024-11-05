import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from '../../../src/auth/pages/RegisterPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

const mockStartCreatingUserWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startCreatingUserWithEmailPassword: ({ displayName, email, password }) => {
    return () =>
      mockStartCreatingUserWithEmailPassword({ displayName, email, password });
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

describe('Pruebas en <RegisterPage />', () => {
  test('debe de mostrar los campos correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Register')).toBeTruthy();
  });

  test('debe de hacer el submit y crear un nuevo usuario', () => {
    const displayName = 'Demo';
    const email = 'demo@gmail.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const displayNameField = screen.getByLabelText('fullName');
    fireEvent.change(displayNameField, {
      target: { value: displayName },
    });

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { value: email } });

    const passwordField = screen.getByLabelText('password');
    fireEvent.change(passwordField, { target: { value: password } });

    const createAccountBtn = screen.getByRole('button', {
      name: 'Crear Cuenta',
    });

    fireEvent.submit(createAccountBtn);

    expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalledWith({
      displayName,
      email,
      password,
    });
  });
});
