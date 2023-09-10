'use client';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { app } from 'shared/constants/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password);
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
