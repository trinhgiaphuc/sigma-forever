import { useContext, useState } from 'react';
import { userContext } from '@libs/context';
import { db, getUserWithUsername, ruleToJSON } from '@libs/firebase';

import Metatags from '@components/Metatags';
import RuleList from '@components/RuleList';
import UserProfile from '@components/UserProfile';
import LoginRequestButton from '@components/LoginRequestButton';

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as dbQuery,
} from 'firebase/firestore';
import UpdateProfileForm from '@components/UpdateProfileForm';

export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  let user = null;
  let rules = null;

  if (!userDoc?.exists) return { notFound: true };
  else {
    user = userDoc.data();

    const rulesQuery = dbQuery(
      collection(db, 'users', userDoc.id, 'rules'),
      orderBy('ruleNumber', 'asc'),
      limit(5)
    );
    rules = (await getDocs(rulesQuery)).docs.map(ruleToJSON);
  }

  return { props: { user, rules } };
}

export default function UserProfilePage({ user, rules }) {
  const { username } = useContext(userContext);
  const [editProfile, setEditProfile] = useState(false);

  return (
    <main className="h-[94vh] mt-3 pb-8 overflow-y-scroll">
      <Metatags title="user page" />
      <div className="w-[90%] container mx-auto flex flex-col items-center gap-2 p-4 bg-yellow-200 rounded-xl shadow-md shadow-black">
        {editProfile && <UpdateProfileForm user={user} />}

        <UserProfile user={user} username={username} />
        {user.username === username && (
          <button
            onClick={() => setEditProfile(true)}
            className="btn bg-red-400"
          >
            edit profile
          </button>
        )}
        <div
          className={`px-2 mt-5 pt-5 border-t-[3px] border-t-zinc-700 mx-auto md:w-3/4`}
        >
          {username ? (
            rules?.length ? (
              <RuleList rules={rules} />
            ) : (
              <h1 className="label text-center border-2 border-zinc-800 text-zinc-800 rounded-md px-5 py-6 mt-">
                No rules found
              </h1>
            )
          ) : (
            <LoginRequestButton>
              Please login to see profile and all the rules posted by this user
            </LoginRequestButton>
          )}
        </div>
      </div>
    </main>
  );
}
