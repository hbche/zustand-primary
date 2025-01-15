import { StateCreator } from 'zustand';
import { BearSlice } from './create-bear-slice';
import { FishSlice } from './create-fish-slice';

export interface SharedSlice {
  addBoth: () => void;
  getBoth: () => number;
}

export const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (_set, get) => {
  return {
    addBoth: () => {
      get().addBear();
      get().addFish();
    },
    getBoth: () => {
      return get().bears + get().fishes;
    },
  };
};
