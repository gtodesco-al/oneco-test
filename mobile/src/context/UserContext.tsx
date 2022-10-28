import React, {createContext, FC, useState} from 'react';
import {PropsUserContext, UserContextState} from '../models';

const UserContext = createContext<PropsUserContext>({
  userContextState: null,
  setUserContextState: () => {},
});

export const UserProvider: FC = ({children}) => {
  const [userContextState, setUserContextState] =
    useState<UserContextState | null>(null);
  return (
    <UserContext.Provider value={{userContextState, setUserContextState}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
