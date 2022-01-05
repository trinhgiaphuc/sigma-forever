import { Fragment } from 'react';

import Image from 'next/image';
import userImageSrc from '@public/user_avatar.jpg';
import firefilledSrc from '@public/firefilled.png';
import Loading from './Loading';

export default function UserProfile({ user }) {
  return user ? (
    <Fragment>
      <div className="w-[45%] md:w-[30%] lg:w-[20%] xl:w-[15%] border border-black rounded-full overflow-hidden text-none">
        <Image
          priority
          src={user ? user.photoURL || userImageSrc : userImageSrc}
          width={500}
          height={500}
          alt="user profile picture"
        />
      </div>
      <h1 className="font-bold text-2xl">{user.username}</h1>
      <p className="italic text-xl text-center tracking-widest">
        Anh em nên nhớ, tóc không máu lửa, đời không nể.
      </p>
      <div className="flex-center flex-col tracking-wider text-2xl">
        <div className="flex items-center">
          <div className="w-10 h-10 saturate-200">
            <Image
              src={firefilledSrc}
              alt="fire icon"
              width={256}
              height={256}
            />
          </div>
          <p>: 231</p>
        </div>
        <p>Rules Created: 21</p>
      </div>
    </Fragment>
  ) : (
    <Loading />
  );
}
