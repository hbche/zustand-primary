import { omit } from 'lodash-es';
import { create } from 'zustand';

interface FishState {
  salmon?: number;
  tuna?: number;
  deleteEverything?: () => void;
  deleteTuna?: () => void;
}

const useFishStore = create<FishState>((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true),
  deleteTuna: () => set((state) => omit<FishState>(state, ['tuna']), true),
}));

export default useFishStore;
