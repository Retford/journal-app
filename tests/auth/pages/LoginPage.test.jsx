import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
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

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
// const mockUseDispatch = jest.fn();

// jest.mock('../../../src/store/auth/thunks', () => ({
//   startGoogleSignIn: () => mockStartGoogleSignIn,
//   startLoginWithEmailPassword: ({ email, password }) =>
//     mockStartLoginWithEmailPassword({ email, password }),
// }));

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: () => mockUseDispatch,
// }));

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

describe('Pruebas en <LoginPage />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrarse el componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login')).toBeTruthy();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('debe de mostrar darle click al botón de "Google"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const buttonGoogle = screen.getByRole('button', { name: 'Google' });

    fireEvent.click(buttonGoogle);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('debe de llamarse al handleSubmit', () => {
    const email = 'abc@gmail.com';
    const password = '123456';
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });

    fireEvent.change(emailField, { target: { value: email } });

    const passwordField = screen.getByTestId('password');

    fireEvent.change(passwordField, { target: { value: password } });

    const submitForm = screen.getByLabelText('submit-form');
    fireEvent.submit(submitForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
