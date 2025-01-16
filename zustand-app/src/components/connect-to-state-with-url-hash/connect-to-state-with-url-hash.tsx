import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

const getUrlSearch = () => {
  return window.location.search.slice(1);
};

const persistentStorage: StateStorage = {
  getItem: (name: string): string => {
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      const sortedValue = searchParams.get(name);
      return JSON.parse(sortedValue as string);
    } else {
      return JSON.parse(localStorage.getItem(name) as string);
    }
  },
  setItem: (name: string, value: string): void => {
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      searchParams.set(name, JSON.stringify(value));
      window.history.replaceState({}, '', '?' + searchParams.toString());
    }

    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string): void => {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.delete(name);
    window.location.search = searchParams.toString();
  },
};

type LocalAndUrlStore = {
  typesOfFish: string[];
  addTypeOfFish: (fishType: string) => void;
  numberOfBears: number;
  setNumberOfBears: (newNumber: number) => void;
};

const storageOptions = {
  name: 'fishAndBearsStore',
  storage: createJSONStorage<LocalAndUrlStore>(() => persistentStorage),
};

export const useLocalAndUrlStore = create<LocalAndUrlStore>()(
  persist(
    (set) => ({
      typesOfFish: [],
      addTypeOfFish: (fishType: string) =>
        set((state) => ({ typesOfFish: [...state.typesOfFish, fishType] })),
      numberOfBears: 0,
      setNumberOfBears: (newNumber: number) =>
        set((state) => ({
          ...state,
          numberOfBears: newNumber,
        })),
    }),
    storageOptions
  )
);
