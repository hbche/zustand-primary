import { create as actualCreate, type StateCreator } from 'zustand';

const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const create = <T>(storeCreator: StateCreator<T>) => {
  const store = actualCreate(storeCreator);
  const initialState = store.getInitialState();
  console.log(initialState);
  sliceResetFns.add(() => {
    store.setState(initialState, true);
  });

  return store;
};
