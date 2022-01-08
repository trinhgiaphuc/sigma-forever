import Link from 'next/link';

export default function Rule({ rule, viewDetail }) {
  const createdAt =
    typeof rule.createdAt === 'number'
      ? new Date(rule.createdAt).toLocaleString()
      : rule.createdAt;

  return (
    <div
      className={`rule bg-card animate-card ${
        rule.ruleNumber === viewDetail && ' bg-card-selected'
      }`}
    >
      <div className="flex justify-between p-2 gap-4 flex-wrap ">
        <p className="text-xs self-start">Sigma Rule #{rule.ruleNumber}</p>
        <p className="italic text-xs self-end">{createdAt}</p>
      </div>

      {/* <Link href={`/${rule.author}/${rule.ruleNumber}`} passHref> */}
      <h2 className="font-medium text-xl lg:text-2xl p-3 text-center cursor-pointer whitespace-pre-wrap">
        {rule.content}
      </h2>
      {/* </Link> */}

      <p className="italic self-end text-right cursor-pointer tracking-wide font-medium md:mr-2 lg:mr-4 ">
        <Link href={`/${rule.author}`}>{rule.author}</Link>
      </p>
    </div>
  );
}
