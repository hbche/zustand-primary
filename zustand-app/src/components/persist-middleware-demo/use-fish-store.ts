import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FishStore {
  fishes: number;
  addFish: () => void;
}

export const useFishStore = create(
  persist<FishStore>(
    (set, get) => {
      return {
        fishes: 0,
        addFish: () => set({ fishes: get().fishes + 1 }),
      };
    },
    {
      name: 'persist-middleware',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
