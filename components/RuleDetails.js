import FireButton from './FireButton';
import { FaEllipsisV } from 'react-icons/fa';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import Link from 'next/link';
import CommentList from './CommentList';

export default function RuleDetails({ rule, viewDetail, comments }) {
  return (
    <div
      className={`absolute top-0 left-full w-[90%] h-[83vh] pb-20 rounded-lg shadow-lg shadow-zinc-500 p-2 hidden lg:block overflow-y-scroll no-scrollbar ${
        viewDetail === rule?.ruleNumber && 'bg-card-selected-invert'
      }`}
    >
      <h1 className="text-5xl italic text-left font-medium p-2">
        #{rule?.ruleNumber}
      </h1>

      <button className="absolute top-0 left-full -translate-x-full p-5 rounded-bl-lg rounded-tr-lg active:shadow-md">
        <FaEllipsisV className="text-2xl" />
      </button>

      <Link passHref href={`/${rule?.author}`}>
        <div className="text-3xl rounded-lg shadow-md border border-zinc-400 italic font-medium mx-auto colorful-text cursor-pointer p-2 hover:colorful-text-invert">
          ~{rule?.author}~
        </div>
      </Link>

      <p className="italic text-2xl p-2 text-center">{rule?.createdAt}</p>

      <h2 className="font-medium text-3xl px-4 pb-4 under text-center whitespace-pre-wrap">
        {rule?.content}
      </h2>

      <div className="flex items-center justify-evenly gap-1 py-2 border-t-2 border-b-2 border-zinc-500">
        <FireButton />
        <CommentButton />
        <ShareButton />
      </div>

      <CommentList />
    </div>
  );
}
