import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@libs/firebase';

export default function useUserData() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, []);

  return { user, setUser };
}
