import { useCallback, useContext } from 'react';
import { CounterStore } from './stores/create-counter-store';
import { CounterStoreContext } from './counter-store-provider';
import { createCounterStoreFactory } from './stores/create-counter-store-factory';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/vanilla/shallow';

export function useCounterStore<U>(
  storeKey: string,
  selector: (state: CounterStore) => U
) {
  const stores = useContext(CounterStoreContext);

  if (stores === undefined) {
    throw new Error(
      'useCounterStore must be used within CounterStoresProvider'
    );
  }

  const getOrCreateCounterStoreByKey = useCallback(
    (storeKey: string) => createCounterStoreFactory(stores!)(storeKey),
    [stores]
  );

  return useStoreWithEqualityFn(
    getOrCreateCounterStoreByKey(storeKey),
    selector,
    shallow
  );
}
