import {Dispatch, SetStateAction} from 'react';
import {BatchesDetailsFilterContextState} from '../State';

type PropsBatchesDetailsFilterContext = {
  batchesDetailsFilterContextState: BatchesDetailsFilterContextState | null;
  setBatchesDetailsFilterContextState: Dispatch<
    SetStateAction<BatchesDetailsFilterContextState | null>
  >;
};

export type {PropsBatchesDetailsFilterContext};
