import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from '@libs/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function useUserData() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    onAuthStateChanged(auth, userData => {
      if (userData) {
        const ref = doc(db, 'users', userData.uid);
        unsubscribe = onSnapshot(ref, doc => {
          if (doc.data()) setUser(doc.data());
          else {
            setUser(userData);
            router.push('/enter');
          }
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, username };
}
