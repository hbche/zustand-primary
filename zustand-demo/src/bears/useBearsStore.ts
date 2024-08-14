import { create } from "zustand";
import { BearsStore } from "../model";

const useBearsStore = create<BearsStore>((set) => ({
    bearsState: {
        total: 3,
        moving: false,
    },
    running: () => set((state: BearsStore) => ({bearsState: {...state.bearsState, moving: true}})),
    sleeping: () => set((state: BearsStore) => ({bearsState: {...state.bearsState, moving: false}})),
    increase: (newBears: number) => set((state: BearsStore) => ({bearsState: {...state.bearsState, total: state.bearsState.total + newBears}})),
    decrease: (newBears: number) => set((state: BearsStore) => ({bearsState: {...state.bearsState, total: Math.max(state.bearsState.total - newBears, 0)}})),
    removeAll: () => set((state: BearsStore) => ({bearsState: {...state.bearsState, total: 0}})),
}));

export default useBearsStore;