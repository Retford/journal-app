import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('pruebas en AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de invocar el checkingCredentials', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe de checkingCredentials y login - Éxito', async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de checkingCredentials y login - Error', async () => {
    const loginData = { ok: false, errorMessage: 'No se pudo hacer login' };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startCreatingUserWithEmailPassword debe de checkingCredentials y login - Éxito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      displayName: 'Demo User',
      email: demoUser.email,
      password: '123abc',
    };
    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startCreatingUserWithEmailPassword debe de checkingCredentials y login - Error', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Login o password incorrectos',
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(loginData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startLoginWithEmailPassword debe de checkingCredentials y login - Éxito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      displayName: 'Demo User',
      email: demoUser.email,
      password: '123abc',
    };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailPassword debe de checkingCredentials y login - Error', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Login o password incorrectos',
    };
    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(loginData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startLogout debe de llamar logoutFirebase, clearNotesLogout y logout', async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
