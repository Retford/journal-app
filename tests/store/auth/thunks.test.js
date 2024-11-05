import {
  checkingAuthentication,
  checkingCredentials,
} from '../../../src/store/auth/';

jest.mock('../../../src/firebase/providers');

describe('pruebas en AuthThunks', () => {
  test('debe de invocar el checkingCredentials', async () => {
    const dispatch = jest.fn();
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
