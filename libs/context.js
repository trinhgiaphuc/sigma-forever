import { createContext } from 'react';
import useUserData from './hooks/useUserData';

export const userContext = createContext({ user: null, username: null });

export default function UserProvider({ children }) {
  const userData = useUserData();

  return (
    <userContext.Provider value={userData}>{children}</userContext.Provider>
  );
}
