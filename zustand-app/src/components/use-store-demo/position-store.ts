import { createStore } from 'zustand';

type PositionStoreState = {
  position: { x: number; y: number };
};

type PositionStoreActions = {
  setPosition: (position: PositionStoreState['position']) => void;
};

export type PositionStore = PositionStoreState & PositionStoreActions;

export const positionStore = createStore<PositionStore>()((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}));

export const createPositionStore = () => {
  return createStore<PositionStore>()((set) => ({
    position: { x: 0, y: 0 },
    setPosition: (position) => set({ position }),
  }));
};
