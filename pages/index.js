import { Fragment, useContext } from 'react';

import Link from 'next/link';
import RuleList from '@components/RuleList';

import { getRules } from '@libs/firebase';
import MetaTags from '@components/MetaTags';
import { userContext } from '@libs/context';

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
      <MetaTags title="Home" />
      <main className="h-screen overflow-scroll">
        <div className={`px-2 mx-auto my-2 sm:w-3/4 md:w-3/5 lg:w-2/4`}>
          {user ? (
            <Link href="/add-rule" passHref>
              <input
                className="p-4 w-full my-2 outline-none border rounded-lg border-zinc-400 shadow-sm shadow-zinc-500"
                placeholder="add a rule"
              />
            </Link>
          ) : null}
          <RuleList rules={rules} />
        </div>
      </main>
    </Fragment>
  );
}
