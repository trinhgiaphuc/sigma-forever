import { createContext } from 'react';
import useUserData from '@libs/hooks/useUserData';

export const userContext = createContext({ user: null });

export default function UserProvider({ children }) {
  const value = useUserData();

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
