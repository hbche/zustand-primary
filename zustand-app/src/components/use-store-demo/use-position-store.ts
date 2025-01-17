import React from 'react';
import { PositionStoreContext } from './position-store-provider';
import { useStore } from 'zustand';
import { PositionStore } from './position-store';

export function usePositionStore<U>(selector: (state: PositionStore) => U) {
  const positionStore = React.useContext(PositionStoreContext);

  if (!positionStore) {
    throw new Error(
      'usePositionStore must be used within PositionStoreProvider'
    );
  }

  return useStore(positionStore, selector);
}
