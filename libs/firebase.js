import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

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
