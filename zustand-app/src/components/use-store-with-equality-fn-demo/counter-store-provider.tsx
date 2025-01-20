import React, { PropsWithChildren, useState } from 'react';
import { createCounterStore } from './stores/create-counter-store';

export const CounterStoreContext = React.createContext<Map<
  string,
  ReturnType<typeof createCounterStore>
> | null>(null);

export function CounterStoreProvider({ children }: PropsWithChildren) {
  const [counterStores] = useState(
    () => new Map<string, ReturnType<typeof createCounterStore>>()
  );

  return (
    <CounterStoreContext.Provider value={counterStores}>
      {children}
    </CounterStoreContext.Provider>
  );
}
