import { useCallback, useContext } from 'react';
import { CounterStore, createCounterStore } from './create-counter-store';
import { CounterStoresContext } from './counter-stores-provider';
import { useStore } from 'zustand';

const createCounterStoreFactory = (
  counterStores: Map<string, ReturnType<typeof createCounterStore>>
) => {
  return (counterStoreKey: string): ReturnType<typeof createCounterStore> => {
    if (!counterStores.has(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore());
    }

    return counterStores.get(counterStoreKey)!;
  };
};

export const useCounterStore = <U>(
  name: string,
  selector: (state: CounterStore) => U
) => {
  const stores = useContext(CounterStoresContext);

  if (!stores) {
    throw new Error(
      'useCounterStore must be used within CounterStoresProvider'
    );
  }

  const getOrCreateCounterStoreByKey = useCallback(
    () => createCounterStoreFactory(stores),
    [stores]
  );

  return useStore(getOrCreateCounterStoreByKey()(name), selector);
};
