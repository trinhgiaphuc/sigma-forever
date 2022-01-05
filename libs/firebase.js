import { initializeApp } from 'firebase/app';
import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
  limit,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAK4Us0_ae0EjqxDoBoitVUgvWDVgqGymM',
  authDomain: 'sigma-forever.firebaseapp.com',
  projectId: 'sigma-forever',
  storageBucket: 'sigma-forever.appspot.com',
  messagingSenderId: '41731724155',
  appId: '1:41731724155:web:596e82c66777b897f923de',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const fromMillis = Timestamp.fromMillis;

export const getUserWithUsername = async username => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const data = await getDocs(q);
  return data.docs[0];
};

export const getRules = async (
  order = 'ruleNumber',
  direction = 'desc',
  limitData = 1
) => {
  const collectionRef = collectionGroup(db, 'rules');
  const q = query(collectionRef, orderBy(order, direction), limit(limitData));
  const rules = (await getDocs(q)).docs.map(ruleToJSON);
  return rules;
};

export const ruleToJSON = doc => {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
};
