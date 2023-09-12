'use client';

import { doc, setDoc } from '@firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { app, db } from 'shared/constants/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const signUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    if (user) {
      const userRef = doc(db, 'user', user.uid);
      setDoc(userRef, []);
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Create Account</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" onClick={() => signUp()}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
