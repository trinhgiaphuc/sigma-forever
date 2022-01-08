import Image from 'next/image';
import Link from 'next/link';

import userImageSrc from '@public/user_avatar_low.jpg';

export default function UserTag({ username, user, inSmallScreen }) {
  return (
    <Link href={`/${username}`} passHref className="flex-center">
      <div className="flex items-center cursor-pointer gap-2 rounded-full shadow-sm shadow-black md:rounded-2xl md:px-4 md:py-1 md:bg-orange-300">
        <Image
          className="rounded-full"
          src={user?.photoURL || userImageSrc}
          width={inSmallScreen ? 30 : 48}
          height={inSmallScreen ? 30 : 48}
          alt="user profile picture"
          objectFit
        />

        <h2 className="font-semibold hidden md:block">{username}</h2>
      </div>
    </Link>
  );
}
