import { StoreApi, createStore, useStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

function createSelectors<S extends StoreApi<object>>(_store: S) {
  let store = _store as WithSelectors<S>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () =>
      useStore(_store, (s) => s[k as keyof typeof s]);
  }

  return store;
}

interface BearState {
  bears: number;
  increase: (by: number) => void;
  increment: () => void;
}

const store = createStore<BearState>((set) => ({
  bears: 0,
  increase: (by: number) => {
    set((state) => ({ bears: state.bears + by }));
  },
  increment: () => {
    set((state) => ({ bears: state.bears + 1 }));
  },
}));

const useBearStore = createSelectors(store);

export default function AutoGenerateSelectorDemo() {
  const bears = useBearStore.use.bears();
  const increment = useBearStore.use.increment();

  return (
    <div>
      Bears: {bears}
      <button onClick={increment}>+1</button>
    </div>
  );
}
