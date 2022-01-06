import Link from 'next/link';
import notFoundSrc from '@public/404.gif';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen py-20 grid bg-zinc-200 place-items-center overflow-y-scroll">
      <div className="flex-center w-[50%] mx-auto flex-col gap-4">
        <Image
          className=""
          src={notFoundSrc}
          width={1200}
          height={720}
          layout="intrinsic"
          alt="not found"
        />
        <Link passHref href="/">
          <button className="btn bg-orange-500 shadow-sm shadow-black px-10 py-5 ">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}
