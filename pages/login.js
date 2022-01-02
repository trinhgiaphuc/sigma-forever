import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useUserData from '@libs/hooks/useUserData';

import Image from 'next/image';
import githubIcon from '@public/github.svg';
import googleIcon from '@public/google.svg';

import { auth, githubProvider, googleProvider } from '@libs/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import ErrorMessage from '@components/ErrorMessage';

export default function Login() {
  const router = useRouter();
  const { setUser } = useUserData();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
      if (user) router.back();
    });
  }, [router, setUser]);

  async function loginWithGoogle() {
    await signInWithPopup(auth, googleProvider).catch(error => console.log);
  }
  async function loginWithGitHub() {
    await signInWithPopup(auth, githubProvider).catch(error => console.log);
  }

  return (
    <div className="h-[85vh] grid place-items-center ">
      <LoginForm />

      <div className="w-full flex flex-col items-center gap-2 md: lg:w-1/3">
        <button
          onClick={() => router.push('/sign-up')}
          className="btn btn-sign bg-green-900 text-white"
        >
          OR SIGN UP
        </button>

        <button
          onClick={loginWithGoogle}
          className="btn btn-sign flex-center gap-2 bg-white"
        >
          <Image src={googleIcon} width={45} height={45} alt="google icon" />
          <p className="hidden sm:block">SIGN UP WITH GOOGLE</p>
        </button>
        <button
          onClick={loginWithGitHub}
          className="btn btn-sign flex-center gap-2 bg-white"
        >
          <Image src={githubIcon} width={45} height={45} alt="github icon" />
          <p className="hidden sm:block">SIGN UP WITH GITHUB</p>
        </button>
      </div>
    </div>
  );
}

function LoginForm() {
  const [error, setError] = useState('');
  async function loginWithEmailAndPassword(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        e.target[0].value,
        e.target[1].value
      );
    } catch (error) {
      if (error.message.includes('user-not-found'))
        setError('Invalid email address or password');
    }
  }

  return (
    <form
      onSubmit={loginWithEmailAndPassword}
      className="flex flex-col gap-4 w-[90%] sm:w-[70%] md:w-3/6 lg:w-2/6 self-end"
    >
      <div className="flex flex-col">
        <label className="label" htmlFor="username">
          email
        </label>
        <input
          onFocus={() => setError('')}
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
          placeholder="password"
          className="user__form-input"
          type="text"
        />
      </div>

      <button type="submit" className="btn bg-slate-200 border-black">
        LOGIN
      </button>
      {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}
    </form>
  );
}
