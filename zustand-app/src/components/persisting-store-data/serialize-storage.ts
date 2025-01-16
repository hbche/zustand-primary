import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import superjson from 'superjson';
import { create } from 'zustand';

const storage: StateStorage = {
  getItem: (name: string): string | null => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name: string, value: string): void => {
    localStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  },
};

interface BearState {
  bear: Map<string, string>;
  fish: Set<string>;
  time: Date;
  query: RegExp;
}
const initialState: BearState = {
  bear: new Map(),
  fish: new Set(),
  time: new Date(),
  query: new RegExp(''),
};

export const useBoundStore = create<BearState>()(
  persist((set, get) => ({ ...initialState }), {
    name: 'food-storage',
    storage: createJSONStorage(() => storage),
  })
);
