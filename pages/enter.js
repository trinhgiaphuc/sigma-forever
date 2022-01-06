import { Fragment, useContext, useState } from 'react';
import { userContext } from '@libs/context';

import githubIcon from '@public/github.svg';
import googleIcon from '@public/google.svg';

import Image from 'next/image';
import Router from 'next/router';

import Metatags from '@components/Metatags';
import ErrorMessage from '@components/ErrorMessage';
import UpdateProfileForm from '@components/UpdateProfileForm';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from '@libs/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function EnterPage() {
  const { user, username } = useContext(userContext);
  const [signUp, setSignUp] = useState(false);

  if (auth.currentUser && username) Router.back();

  return (
    <Fragment>
      <Metatags title="login page" />
      {user && !username ? <UpdateProfileForm user={user} /> : null}

      {signUp ? (
        <SignUpPage
          LoginButton={
            <button
              type="button"
              onClick={() => setSignUp(false)}
              className="btn bg-emerald-700 text-white border-black md:mt-4"
            >
              LOGIN
            </button>
          }
        />
      ) : (
        <Login
          SignUpButton={
            <button
              onClick={() => setSignUp(true)}
              className="btn btn-sign bg-green-900 text-white"
            >
              OR SIGN UP
            </button>
          }
        />
      )}
    </Fragment>
  );
}

function Login({ SignUpButton }) {
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
        {SignUpButton}

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
          id="password"
          onFocus={() => setError('')}
          placeholder="password"
          className="user__form-input"
          type="password"
        />
      </div>

      <button type="submit" className="btn bg-slate-200 border-black">
        LOGIN
      </button>
      {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}
    </form>
  );
}

function SignUpPage({ LoginButton }) {
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

        {LoginButton}
      </form>
    </div>
  );
}
