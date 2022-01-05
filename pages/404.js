import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen grid bg-zinc-200 place-items-center">
      <div className="flex-center flex-col gap-4 lg:gap-44">
        <iframe
          className="lg:scale-[3] border-2 shadow-sm shadow-black"
          src="https://giphy.com/embed/PUeLv1PJoTsXtotkBJ"
          frameBorder="0"
          allowFullScreen
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
