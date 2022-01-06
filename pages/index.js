import { Fragment, useContext } from 'react';
import { userContext } from '@libs/context';

import Link from 'next/link';
import RuleList from '@components/RuleList';
import Metatags from '@components/Metatags';

import { getRules } from '@libs/firebase';

const LIMIT = 10;

export async function getServerSideProps(context) {
  const rules = await getRules('ruleNumber', 'asc', LIMIT);

  return {
    props: {
      rules,
    },
  };
}

export default function Home({ rules }) {
  const { user } = useContext(userContext);
  return (
    <Fragment>
      <Metatags title="Home" />
      <main className="h-[93vh] pb-20 overflow-y-scroll">
        <div className={`px-2 mx-auto my-2 sm:w-3/4 md:w-3/5 lg:w-2/4`}>
          {user ? (
            <Link href="/add-rule" passHref>
              <input
                className="p-4 w-full my-2 outline-none border rounded-lg border-zinc-400 shadow-sm shadow-zinc-500"
                placeholder="add a rule"
              />
            </Link>
          ) : null}
          {rules.length ? (
            <RuleList rules={rules} />
          ) : (
            <h1 className="label text-center border-2 border-zinc-800 text-zinc-800 rounded-md px-5 py-6 mt-2">
              No rules found
            </h1>
          )}
        </div>
      </main>
    </Fragment>
  );
}
