import React, {createContext, FC, useState} from 'react';
import {PropsLocationContext, LocationContextState} from '../models';

const LocationContext = createContext<PropsLocationContext>({
  locationContextState: null,
  setLocationContextState: () => {},
});

export const LocationProvider: FC = ({children}) => {
  const [locationContextState, setLocationContextState] =
    useState<LocationContextState | null>(null);
  return (
    <LocationContext.Provider
      value={{
        locationContextState,
        setLocationContextState,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
