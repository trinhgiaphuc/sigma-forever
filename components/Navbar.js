import React, { Fragment, useContext, useState } from 'react';
import useWindowWide from '../libs/hooks/useWindowWide';
import { userContext } from '@libs/context';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Modal from './Modal';
import SearchBar from './SearchBar';
import { FaSearch, FaBars, FaRegWindowClose } from 'react-icons/fa';

import { signOut } from 'firebase/auth';
import { auth } from '../libs/firebase';
import UserTag from './UserTag';

export default function Navbar() {
  const { user, username } = useContext(userContext);

  const inSmallScreen = useWindowWide(640);

  const [showModal, setShowModal] = useState(true);
  const [showNavItems, setShowNavItems] = useState(true);

  const router = useRouter();

  const showModalHandle = () => {
    setShowModal(true);
  };

  const searchHandle = () => {
    if (inSmallScreen) {
      setShowNavItems(false);
      setShowModal(false);
    }
  };

  const signOutHandle = async () => {
    showModalHandle();
    if (!user) router.push('/enter');
    else {
      await signOut(auth);
      router.reload();
    }
  };

  return (
    <nav className="navbar shadow-sm shadow-zinc-400" id="navbar">
      {/* LOGO */}
      <Link href="/" passHref>
        <a className="logo z-20" onClick={showModalHandle}>
          {!inSmallScreen && 'FOR'}
          <span className="text-4xl font-black text-orange-600 sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
            Σ
          </span>
          {!inSmallScreen && 'VER'}
        </a>
      </Link>

      {/* SEARCH BAR */}
      <div onClick={searchHandle} className="input__search-large">
        <FaSearch className="text-lg" />
        <input
          className={`flex-grow px-4 outline-none bg-transparent hidden sm:block`}
          type="text"
          placeholder="Grind the search bar"
        />
      </div>

      {/* USER TAG */}
      {user ? <UserTag username={username} user={user} /> : null}

      {/* NAVIGATION */}
      <button
        onClick={() => {
          setShowModal(!showModal);
          setShowNavItems(true);
        }}
        className="outline-none z-20"
      >
        {showModal ? (
          <FaBars className="text-2xl text-zinc-700 xl:text-4xl" />
        ) : (
          <FaRegWindowClose className="text-2xl text-zinc-700 xl:text-4xl" />
        )}
      </button>

      <Modal showModal={showModal}>
        {showNavItems ? (
          <Fragment>
            <Link href="/entertain">
              <a className="link" onClick={showModalHandle}>
                <span>Entertain</span>
              </a>
            </Link>
            <Link href="/feedback">
              <a className="link" onClick={showModalHandle}>
                <span>Feedback</span>
              </a>
            </Link>
            <Link href="/about">
              <a className="link" onClick={showModalHandle}>
                <span>About Us</span>
              </a>
            </Link>
            <Link href="/setting">
              <a className="link" onClick={showModalHandle}>
                <span>Settings</span>
              </a>
            </Link>
            <button className="link" onClick={signOutHandle}>
              <span>{user ? 'Logout' : 'Login'}</span>
            </button>
          </Fragment>
        ) : (
          <SearchBar />
        )}
      </Modal>
    </nav>
  );
}
