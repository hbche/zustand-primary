import { useContext } from 'react';
import { PositionStoreContext } from './position-store-provider';
import { PositionStore } from '../use-store-demo/position-store';
import { shallow } from 'zustand/vanilla/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

export const usePositionStore = <U>(selector: (state: PositionStore) => U) => {
  const positionStore = useContext(PositionStoreContext);

  if (!positionStore) {
    throw new Error(
      'usePositionStore must be used within PositionStoreProvider'
    );
  }

  return useStoreWithEqualityFn(positionStore, selector, shallow);
};
