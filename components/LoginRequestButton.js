import Link from 'next/link';

export default function LoginRequestButton({ children }) {
  return (
    <Link passHref href="/enter">
      <h1 className="label cursor-pointer text-center border-2 shadow-md shadow-green-400 border-green-700 text-green-700 rounded-md px-5 py-6 mt-10">
        {children}
      </h1>
    </Link>
  );
}
