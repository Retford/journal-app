import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    const { fullName, email, photoURL, uid } = user;
    return {
      ok: true,
      // user Info
      fullName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  fullName,
  email,
  password,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { fullName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      fullName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName: fullName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      fullName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};
