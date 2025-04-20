import { createContext, useContext } from 'react';

const userContext = createContext({
  user: null,
  setUser: null,
});

export const useUserContext = () => useContext(userContext);

export default userContext;
