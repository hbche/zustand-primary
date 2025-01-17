import { create } from 'zustand';
import { logger } from './log-middleware';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

export const useBearStore = create<BearState>()(
  logger(
    (set) => ({
      bears: 0,
      increase: (by: number) => set((state) => ({ bears: state.bears + by })),
    }),
    'bear-store'
  )
);
