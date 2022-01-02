import { useState } from 'react';
import useUserData from '@libs/hooks/useUserData';

import Link from 'next/link';
import ErrorMessage from '@components/ErrorMessage';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@libs/firebase';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function formIsOk() {
    if (!email.includes('@')) {
      setError('Invalid email address');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmpassword) {
      setError('Password are not the same');
      return false;
    }
    return true;
  }

  const handleSignUp = async e => {
    e.preventDefault();

    if (formIsOk()) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) router.back();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-[85vh] grid place-items-center ">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 w-[90%] sm:w-[70%] md:w-3/6 lg:w-2/6"
      >
        <div className="flex flex-col">
          <label className="label" htmlFor="username">
            email
          </label>
          <input
            onFocus={() => setError('')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            className="user__form-input"
            type="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="label" htmlFor="password">
            password
          </label>
          <input
            onFocus={() => setError('')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
            placeholder="password"
            className="user__form-input"
            type="password"
          />
        </div>
        <div className="flex flex-col">
          <label className="label" htmlFor="confirm">
            confirm password
          </label>
          <input
            onFocus={() => setError('')}
            value={confirmpassword}
            onChange={e => setConfirmPassword(e.target.value)}
            id="confirm"
            placeholder="confirm"
            className="user__form-input"
            type="password"
          />
          {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}
        </div>

        <button type="submit" className="btn my-2 bg-yellow-300 border-black">
          SIGN UP
        </button>

        <Link href="/login" passHref>
          <button
            type="button"
            className="btn bg-emerald-700 text-white border-black md:mt-4"
          >
            JUST REMEMBERED MY ACCOUNT
          </button>
        </Link>
      </form>
    </div>
  );
}
