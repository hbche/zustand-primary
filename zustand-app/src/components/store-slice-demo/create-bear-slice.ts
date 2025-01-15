import { StateCreator } from 'zustand';
import { FishSlice } from './create-fish-slice';

export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => {
  return {
    bears: 2,
    addBear: () => set((state) => ({ ...state, bears: state.bears + 1 })),
    eatFish: () =>
      set((state) => ({ ...state, fishes: state.fishes - state.bears })),
  };
};
