import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

const hashStorage: StateStorage = {
  getItem: (key: string) => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? '';
    return JSON.parse(storedValue);
  },
  setItem: (key: string, newValue: string) => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    location.hash = searchParams.toString();
  },
  removeItem: (key: string) => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();
  },
};

interface State {
  fishes: number;
}

interface Action {
  addFish: () => void;
}

export const useBoundStore = create<State & Action>()(
  persist(
    (set, get) => ({
      fishes: 0,
      addFish: () => set({ fishes: get().fishes + 1 }),
    }),
    { name: 'food-storage', storage: createJSONStorage(() => hashStorage) }
  )
);
