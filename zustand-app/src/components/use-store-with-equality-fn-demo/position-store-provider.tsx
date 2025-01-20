import React, { PropsWithChildren, useState } from 'react';
import { createPositionStore } from './stores/create-position-store';

export const PositionStoreContext = React.createContext<ReturnType<
  typeof createPositionStore
> | null>(null);

export function PositionStoreProvider({ children }: PropsWithChildren) {
  const [positionStore] = useState(createPositionStore);

  return (
    <PositionStoreContext.Provider value={positionStore}>
      {children}
    </PositionStoreContext.Provider>
  );
}
