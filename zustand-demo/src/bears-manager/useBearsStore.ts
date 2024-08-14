import { create } from 'zustand';

export interface BearState {
  moving: boolean;
  total: number;
}

export interface BearsStore {
  bearsState: BearState;
  increase: (step: number) => void;
  decrease: (step: number) => void;
  removeAll: () => void;
  running: () => void;
  sleeping: () => void;
}

const useBearsStore = create<BearsStore>((set) => ({
  bearsState: {
    total: 3,
    moving: false,
  },
  running: () =>
    set((state: BearsStore) => ({
      bearsState: { ...state.bearsState, moving: true },
    })),
  sleeping: () =>
    set((state: BearsStore) => ({
      bearsState: { ...state.bearsState, moving: false },
    })),
  increase: (newBears: number) =>
    set((state: BearsStore) => ({
      bearsState: {
        ...state.bearsState,
        total: state.bearsState.total + newBears,
      },
    })),
  decrease: (newBears: number) =>
    set((state: BearsStore) => ({
      bearsState: {
        ...state.bearsState,
        total: Math.max(state.bearsState.total - newBears, 0),
      },
    })),
  removeAll: () =>
    set((state: BearsStore) => ({
      bearsState: { ...state.bearsState, total: 0 },
    })),
}));

export default useBearsStore;
