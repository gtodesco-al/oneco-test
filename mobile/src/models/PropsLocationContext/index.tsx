import {Dispatch, SetStateAction} from 'react';
import {LocationContextState} from '../State';

type PropsLocationContext = {
  locationContextState: LocationContextState | null;
  setLocationContextState: Dispatch<
    SetStateAction<LocationContextState | null>
  >;
};

export type {PropsLocationContext};
