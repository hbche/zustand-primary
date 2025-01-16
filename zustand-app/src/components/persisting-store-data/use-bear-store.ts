import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  bears: number;
  addABear: () => void;
}

interface HydratedState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useBearStore = create<State & HydratedState>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => sessionStorage),
      // 如果发生重新水合，则更新 _hasHydrated
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
