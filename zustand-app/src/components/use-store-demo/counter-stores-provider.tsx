import React, { PropsWithChildren, useState } from 'react';
import { createCounterStore } from './create-counter-store';

export const CounterStoresContext = React.createContext<Map<
  string,
  ReturnType<typeof createCounterStore>
> | null>(null);

export function CounterStoresProvider({ children }: PropsWithChildren) {
  const [stores] = useState(
    () => new Map<string, ReturnType<typeof createCounterStore>>()
  );

  return (
    <CounterStoresContext.Provider value={stores}>
      {children}
    </CounterStoresContext.Provider>
  );
}
