import { Fragment, useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { db, auth, storage } from '@libs/firebase';
import { doc, getDoc, writeBatch, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { AiFillPlusCircle } from 'react-icons/ai';
import userImageSrc from '@public/user_avatar.jpg';
import Image from 'next/image';
import Modal from './Modal';

export default function UpdateProfileForm({ user }) {
  const [imageUrl, setImageUrl] = useState(user.photoURL);
  const [name, setName] = useState('');
  const [bio, setBio] = useState(user.bio);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setName(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setName(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async username => {
      if (username.length >= 3) {
        const ref = doc(db, 'username', username);
        const docSnap = await getDoc(ref);

        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(name);
  }, [checkUsername, name]);

  const userDoc = doc(db, 'users', auth.currentUser.uid);
  async function updateUserProfile(e) {
    e.preventDefault();

    const batch = writeBatch(db);
    const usernameDoc = doc(db, 'username', e.target[1].value);

    batch.set(userDoc, {
      bio: e.target.bio.value,
      username: name,
      email: user.email,
      createdAt: user.metadata.creationTime,
      photoURL: user.photoURL,
    });
    batch.set(usernameDoc, { uid: user.uid });

    try {
      await batch.commit();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateAgain(e) {
    e.preventDefault();
    const file = Array.from(e.target.picture.files)[0];
    const extension = file.type.split('/')[1];

    const imageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}.${extension}`
    );
    await uploadBytesResumable(imageRef, file).then(async () => {
      const url = await getDownloadURL(imageRef);
      updateDoc(userDoc, {
        bio,
        photoURL: url,
      });
    });
  }

  return (
    <Modal>
      <form
        onSubmit={user.username ? updateAgain : updateUserProfile}
        className="flex flex-col mx-auto gap-4 w-[80%] md:w-full xl:w-[70%] self-end"
      >
        <div className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-96 relative mx-auto aspect-square rounded-full border-4 border-black overflow-hidden text-none">
          <input
            onChange={e => {
              const imgObj = e.target.files[0];
              const url = URL.createObjectURL(imgObj);
              setImageUrl(url);
            }}
            accept="image/x-png,image/gif,image/jpeg"
            max={1}
            id="picture"
            type="file"
            className="absolute w-full h-full z-30 bg-transparent top-0 left-0 cursor-pointer"
          />
          <Image
            priority
            src={imageUrl ? imageUrl : userImageSrc}
            width={500}
            height={500}
            alt="user profile picture"
          />
          <AiFillPlusCircle className="absolute text-2xl top-[80%] left-[69%] text-yellow-400 md:text-3xl lg:text-4xl xl:text-5xl rounded-full shadow-sm shadow-black" />
        </div>

        <div className="flex flex-col gap-2">
          {user.username ? null : (
            <Fragment>
              <label className="label" htmlFor="username">
                username
              </label>
              <input
                value={name}
                onChange={onChange}
                placeholder="username"
                className="user__form-input rounded-lg border border-black"
                type="text"
              />
              <UsernameMessage
                username={name}
                isValid={isValid}
                loading={loading}
              />
            </Fragment>
          )}

          <label className="label" htmlFor="bio">
            bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="bio"
            type="text"
            className="user__form-input rounded-lg resize-none border border-black whitespace-pre-wrap"
          />
        </div>
        <button
          type="submit"
          disabled={!isValid && !user.username}
          className={`btn border-black hover:bg-red-200 ${
            !isValid && !user.username && 'cursor-not-allowed'
          }`}
        >
          Update Profile
        </button>
      </form>
    </Modal>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-600">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-600">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
