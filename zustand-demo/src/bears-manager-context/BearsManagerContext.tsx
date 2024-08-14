import React, { useState } from 'react';
import BearsCounter from './BearsCounter';
import BearsMoving from './BearsMoving';
import BearsController from './BearsController';

export const BearsContext = React.createContext<any>(null);

function useTotal(defaultTotal: number) {
  const [total, setTotal] = useState<number>(defaultTotal);

  return {
    total,
    setTotal,
  };
}

function useMoving(defaultmoving: boolean) {
  const [moving, setMoving] = useState<boolean>(defaultmoving);

  return {
    moving,
    setMoving,
  };
}

function BearsManagerContext() {
  const totalStore = useTotal(3);
  const movingStore = useMoving(false);

  const contextValue = { totalStore, movingStore };

  return (
    <BearsContext.Provider value={contextValue}>
      <BearsCounter />
      <BearsMoving />
      <BearsController />
    </BearsContext.Provider>
  );
}

export default BearsManagerContext;
