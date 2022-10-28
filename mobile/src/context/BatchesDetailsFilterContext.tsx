import React, {createContext, FC, useState} from 'react';

import {PropsBatchesDetailsFilterContext} from '../models/PropsBatchesDetailsFilterContext';
import {BatchesDetailsFilterContextState} from '../models/State';

const BatchesDetailsFilterContext =
  createContext<PropsBatchesDetailsFilterContext>({
    batchesDetailsFilterContextState: null,
    setBatchesDetailsFilterContextState: () => {},
  });

export const BatchesDetailsFilterProvider: FC = ({children}) => {
  const [
    batchesDetailsFilterContextState,
    setBatchesDetailsFilterContextState,
  ] = useState<BatchesDetailsFilterContextState | null>(null);
  return (
    <BatchesDetailsFilterContext.Provider
      value={{
        batchesDetailsFilterContextState,
        setBatchesDetailsFilterContextState,
      }}>
      {children}
    </BatchesDetailsFilterContext.Provider>
  );
};

export default BatchesDetailsFilterContext;
