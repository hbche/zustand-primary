import { create } from 'zustand';
import { BearSlice, createBearSlice } from './create-bear-slice';
import { FishSlice, createFishSlice } from './create-fish-slice';
import { createSharedSlice, SharedSlice } from './create-shared-slice';
import { persist } from 'zustand/middleware';

const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()(
  persist(
    (...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }),
    { name: '' }
  )
);

export default useBoundStore;
