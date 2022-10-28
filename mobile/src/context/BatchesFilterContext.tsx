import React, {createContext, FC, useState} from 'react';

import {PropsBatchesFilterContext} from '../models/PropsBatchesFilterContext';
import {BatchesFilterContextState} from '../models/State';

const BatchesFilterContext = createContext<PropsBatchesFilterContext>({
  batchesFilterContextState: null,
  setBatchesFilterContextState: () => {},
});

export const BatchesFilterProvider: FC = ({children}) => {
  const [batchesFilterContextState, setBatchesFilterContextState] =
    useState<BatchesFilterContextState | null>(null);
  return (
    <BatchesFilterContext.Provider
      value={{
        batchesFilterContextState,
        setBatchesFilterContextState,
      }}>
      {children}
    </BatchesFilterContext.Provider>
  );
};

export default BatchesFilterContext;
