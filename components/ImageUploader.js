import { storage } from '@libs/firebase';
import Image from 'next/image';
import { AiFillPlusCircle } from 'react-icons/ai';

export default function ImageUploader({ user }) {
  const uploadImage = e => {
    const file = e.target.picture;
    console.log(file);
  };

  return (
    <div className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-96 relative mx-auto aspect-square rounded-full border-4 border-black overflow-hidden text-none">
      <input
        id="picture"
        type="file"
        className="absolute w-full h-full z-30 bg-transparent top-0 left-0 cursor-pointer"
      />
      <Image
        priority
        src={user ? user.photoURL || userImageSrc : userImageSrc}
        width={500}
        height={500}
        alt="user profile picture"
      />
      <AiFillPlusCircle className="absolute text-2xl top-[80%] left-[69%] text-yellow-400 md:text-3xl lg:text-4xl xl:text-5xl rounded-full shadow-sm shadow-black" />
    </div>
  );
}
