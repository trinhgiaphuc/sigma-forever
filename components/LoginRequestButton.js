import Link from 'next/link';

export default function LoginRequestButton({ children }) {
  return (
    <Link passHref href="/enter">
      <button className="label cursor-pointer text-center animate-btn bg-card border border-black text-black rounded-md px-5 py-6 mt-10 block mx-auto">
        {children}
      </button>
    </Link>
  );
}
