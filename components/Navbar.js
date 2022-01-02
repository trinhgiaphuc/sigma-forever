import React, { Fragment, useContext, useState } from 'react';
import useWindowWide from '../libs/hooks/useWindowWide';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Image from 'next/image';
import Modal from './Modal';
import SearchBar from './SearchBar';
import { FaSearch, FaBars, FaRegWindowClose } from 'react-icons/fa';
import userImageSrc from '@public/user_avatar_low.jpg';

import { signOut } from 'firebase/auth';
import { auth } from '../libs/firebase';
import { userContext } from '../libs/userContext/userContext';

function Navbar() {
  const { user, setUser } = useContext(userContext);
  const router = useRouter();

  const inSmallScreen = useWindowWide(640);

  const [showModal, setShowModal] = useState(true);
  const [showNavItems, setShowNavItems] = useState(true);

  const showModalHandle = () => {
    setShowModal(true);
  };

  const searchHandle = () => {
    if (inSmallScreen) {
      setShowNavItems(false);
      setShowModal(false);
    }
  };

  const signOutHandle = () => {
    if (!user) router.push('/login');
    showModalHandle();
    signOut(auth);
    setUser(null);
  };

  return (
    <nav className="navbar" id="navbar">
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
      {user ? (
        <Link href="/profile" passHref className="flex-center">
          <div className="flex items-center  cursor-pointer gap-2 rounded-full sm:rounded-2xl sm:px-2 sm:py-1 md:bg-zinc-200">
            <Image
              className="rounded-full"
              src={user.photoURL || userImageSrc}
              width={inSmallScreen ? 30 : 48}
              height={inSmallScreen ? 30 : 48}
              alt="user profile picture"
              objectFit
            />
            <h2 className="font-semibold hidden md:block">Đại Hiệp Who</h2>
          </div>
        </Link>
      ) : null}

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

export default React.memo(Navbar);
