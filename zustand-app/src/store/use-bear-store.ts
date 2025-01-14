import { create } from 'zustand';

interface BearState {
  bears: number;
  nuts: number;
  honey: number;
  increasePopulation: () => void;
  removeAllPopulation: () => void;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  nuts: 0,
  honey: 0,
  increasePopulation: () => {
    set((state) => ({ bears: state.bears + 1 }));
  },
  removeAllPopulation: () => {
    set({ bears: 0 });
  },
}));

export default useBearStore;
