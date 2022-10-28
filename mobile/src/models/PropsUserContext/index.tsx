import {Dispatch, SetStateAction} from 'react';
import {UserContextState} from '../State';

type PropsUserContext = {
  userContextState: UserContextState | null;
  setUserContextState: Dispatch<SetStateAction<UserContextState | null>>;
};

export type {PropsUserContext};
