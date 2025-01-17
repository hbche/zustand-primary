import { ExtractState, create } from 'zustand';
import { combine } from 'zustand/middleware';

type BearState = ExtractState<typeof useBearStore>;

export const useBearStore = create(
  combine(
    {
      bears: 0,
    },
    (set) => ({
      increase: (by: number) => {
        set((state) => ({ bears: state.bears + by }));
      },
    })
  )
);
