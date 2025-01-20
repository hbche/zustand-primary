import { createCounterStore } from './create-counter-store';

const defaultCounterStores = new Map<
  string,
  ReturnType<typeof createCounterStore>
>();

const createCounterStoreFactory = (
  counterStores: typeof defaultCounterStores
) => {
  return (counterStoreKey: string) => {
    if (!counterStores.get(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore());
    }
    return counterStores.get(counterStoreKey)!;
  };
};

export const getOrCreateCounterStoreByKey =
  createCounterStoreFactory(defaultCounterStores);
