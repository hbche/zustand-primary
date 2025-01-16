import { StateCreator } from 'zustand';
import { create } from './create-with-reset';

interface State {
  salmon: number;
  tuna: number;
}

interface Action {
  addSalmon: (qty: number) => void;
  addTuna: (qty: number) => void;
  reset: (qty: number) => void;
}

const initialState: State = {
  salmon: 0,
  tuna: 0,
};

const useSlice: StateCreator<State & Action, [], [], State & Action> = (
  set,
  get
) => ({
  ...initialState,
  addSalmon: (qty: number) => set({ salmon: get().salmon + qty }),
  addTuna: (qty: number) => set({ tuna: get().tuna + qty }),
  reset: () => set({ ...initialState }),
});

export const useBoundStore = create(useSlice);
