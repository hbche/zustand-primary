import { Mutate, StoreApi, create } from 'zustand';
import { persist } from 'zustand/middleware';

type SttorageWithPersist<S = Object> = Mutate<
  StoreApi<S>,
  [['zustand/persist', unknown]]
>;

export const withStorageDOMEvents = (store: SttorageWithPersist) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate();
    }
  };

  window.addEventListener('storage', storageEventCallback);

  return () => {
    window.removeEventListener('storage', storageEventCallback);
  };
};

const useBoundStore = create()(
    persist(...)
);

withStorageDOMEvents(useBoundStore);

