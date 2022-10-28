import {Dispatch, SetStateAction} from 'react';
import {BatchesFilterContextState} from '../State';

type PropsBatchesFilterContext = {
  batchesFilterContextState: BatchesFilterContextState | null;
  setBatchesFilterContextState: Dispatch<
    SetStateAction<BatchesFilterContextState | null>
  >;
};

export type {PropsBatchesFilterContext};
