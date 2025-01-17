import { createStore } from 'zustand';

type CounterState = {
  count: number;
};

type CounterActions = {
  increment: () => void;
};

export type CounterStore = CounterState & CounterActions;

export const createCounterStore = () => {
  return createStore<CounterStore>()((set) => ({
    count: 0,
    increment: () => {
      set((state) => ({
        count: state.count + 1,
      }));
    },
  }));
};
