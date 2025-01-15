import { StateCreator } from 'zustand';
import { BearSlice } from './create-bear-slice';

export interface FishSlice {
  fishes: number;
  addFish: () => void;
}

export const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 100,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});
