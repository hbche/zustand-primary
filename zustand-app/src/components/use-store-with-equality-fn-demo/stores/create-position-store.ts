import { createStore } from 'zustand';

type PositionStoreState = {
  position: {
    x: number;
    y: number;
  };
};

type PositionStoreActions = {
  setPosition: (position: PositionStoreState['position']) => void;
};

type PositionStore = PositionStoreState & PositionStoreActions;

export const createPositionStore = () =>
  createStore<PositionStore>()((set) => ({
    position: { x: 0, y: 0 },
    setPosition: (position) => set({ position }),
  }));
