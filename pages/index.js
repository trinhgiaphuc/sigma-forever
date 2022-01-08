import { Fragment, useContext, useState } from 'react';
import { userContext } from '@libs/context';

import Link from 'next/link';
import RuleList from '@components/RuleList';
import Metatags from '@components/Metatags';

import useWindowWide from '@libs/hooks/useWindowWide';
import RuleDetails from '@components/RuleDetails';
import LoginRequestButton from '@components/LoginRequestButton';

const LIMIT = 10;

const rules = [
  {
    ruleNumber: 1,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'kimshin',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
  {
    ruleNumber: 2,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'tieudiem',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
  {
    ruleNumber: 3,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'kimshin',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
  {
    ruleNumber: 4,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'phudai',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
  {
    ruleNumber: 5,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'lowkai',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
  {
    ruleNumber: 6,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'tpunk',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
  {
    ruleNumber: 7,
    createdAt: '1/6/2022, 3:20:40 PM',
    author: 'nastra',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias saepe deleniti, alias corrupti consequatur ipsum in vero voluptate numquam pariatur beatae dolores est nulla et sint placeat quo voluptatibus sunt.',
  },
];

// export async function getServerSideProps(context) {
//   const rules = await getRules('ruleNumber', 'desc', LIMIT);

//   return {
//     props: {
//       rules,
//     },
//   };
// }

export default function Home(props) {
  const { user } = useContext(userContext);
  const inLargeScreen = useWindowWide(1024);
  const [viewDetail, setViewDetail] = useState(-1);

  return (
    <Fragment>
      <Metatags title="Home" />
      <main className="h-[93vh] ">
        <Link href="/add-rule" passHref>
          <input className="add-a-rule" placeholder="add a rule" />
        </Link>

        <div
          className={`h-full relative mx-auto mt-4 sm:w-3/4 md:w-3/5 lg:w-2/4 lg:mx-0 lg:ml-12`}
        >
          {rules?.length ? (
            <RuleList
              setViewDetail={setViewDetail}
              viewDetail={viewDetail}
              rules={rules}
            />
          ) : (
            <h1 className="label text-center border-2 border-zinc-800 text-zinc-800 rounded-md px-5 py-6 mt-2">
              No rules found
            </h1>
          )}

          {viewDetail > 0 ? (
            user ? (
              <RuleDetails
                rule={rules[viewDetail - 1]}
                viewDetail={viewDetail}
              />
            ) : (
              <div className="absolute top-0 w-full left-full">
                <LoginRequestButton>Click here to login</LoginRequestButton>
              </div>
            )
          ) : null}
        </div>
      </main>
    </Fragment>
  );
}
