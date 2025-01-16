import { del, get, set } from 'idb-keyval';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved');
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(`${name} with value, ${value} has saved`);
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(`${name} has been removed`);
    await del(name);
  },
};

interface State {
  bears: number;
  addABear: () => void;
}

export const useBoundStore = create<State>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => {
        set({ bears: get().bears + 1 });
      },
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
