import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from '@libs/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function useUserData() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    onAuthStateChanged(auth, userData => {
      if (userData) {
        setUser(userData);
        const ref = doc(db, 'users', userData.uid);
        unsubscribe = onSnapshot(ref, doc => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
    });

    return unsubscribe;
  }, []);

  return { user, username };
}
