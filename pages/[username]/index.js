import { Fragment } from 'react';

import firefilledSrc from '@public/firefilled.png';
import userImageSrc from '@public/user_avatar.jpg';

import Image from 'next/image';
import spinnerUrl from '@public/Spinner.svg';
import RuleList from '@components/RuleList';
import useUserData from '@libs/hooks/useUserData';

function UserProfilePage() {
  const { user } = useUserData();

  return (
    <div className="container h-[94vh] mx-auto flex flex-col items-center gap-2 p-4 bg-yellow-200 overflow-y-scroll">
      {user ? (
        <Fragment>
          <div className="w-[45%] md:w-[30%] lg:w-[20%] xl:w-[15%] border-2 border-black text-none">
            <Image
              priority
              src={user.photoURL || userImageSrc}
              width={500}
              height={500}
              alt="user profile picture"
            />
          </div>
          <h1 className="font-bold text-2xl">{user.displayName}</h1>
          <p className="italic text-xl text-center tracking-widest ">
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
        <div className="w-28 sm:w-40">
          <Image src={spinnerUrl} alt="loading icon" width={200} height={200} />
        </div>
      )}
      <RuleList />
    </div>
  );
}

export default UserProfilePage;
