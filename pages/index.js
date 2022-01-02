import Head from 'next/head';
import { Fragment } from 'react';
import RuleList from '@components/RuleList';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>FORΣVER</title>
      </Head>
      <main className="h-screen">
        <div
          className={`p-2 h-[94%] mx-auto mt-2 md:w-2/4 overflow-y-scroll no-scrollbar`}
        >
          <RuleList />
          <RuleList />
        </div>
      </main>
    </Fragment>
  );
}
