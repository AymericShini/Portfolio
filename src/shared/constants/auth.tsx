/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

export const getCurrentUser = async () => {
  const promisifiedOnAuthStateChanged = (auth: Record<string, any>) =>
    new Promise((resolve, _reject) => {
      auth.onAuthStateChanged((user: Record<string, any>) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });

  const uid = await promisifiedOnAuthStateChanged(auth);
  return uid;
};

export const signUpUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    console.log('hi');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
