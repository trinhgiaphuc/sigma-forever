import Link from 'next/link';
import FireButton from './FireButton';

export default function Rule({ rule }) {
  const createdAt =
    typeof rule.createdAt === 'number'
      ? new Date(rule.createdAt).toLocaleString()
      : rule.createdAt;

  return (
    <div className="relative">
      <div className="flex flex-col justify-between p-2 gap-2 sm:flex-row ">
        <p className="text-xs self-start">Sigma Rule #{rule.ruleNumber}</p>
        <p className="italic text-xs self-end">{createdAt}</p>
      </div>

      <Link href={`/${rule.author}/${rule.ruleNumber}`} passHref>
        <h2 className="font-medium text-xl lg:text-2xl p-3 text-center cursor-pointer">
          {rule.content}
        </h2>
      </Link>

      {/* <div className="flex justify-center"> */}
      {/* <FireButton /> */}
      <p className="italic self-end text-right cursor-pointer tracking-wide font-medium md:mr-2 lg:mr-4">
        <Link href={`/${rule.author}`}>{rule.author}</Link>
      </p>
      {/* </div> */}
    </div>
  );
}
