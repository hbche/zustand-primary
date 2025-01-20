import { createCounterStore } from './create-counter-store';

export const createCounterStoreFactory = (
  counterStores: Map<string, ReturnType<typeof createCounterStore>>
) => {
  return (counterStoreKey: string) => {
    if (!counterStores.get(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore());
    }

    return counterStores.get(counterStoreKey)!;
  };
};
