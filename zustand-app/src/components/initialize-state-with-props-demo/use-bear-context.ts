import { useContext } from 'react';
import { BearContext } from './bear-context';
import { BearState } from './create-bear-store';
import { useStoreWithEqualityFn } from 'zustand/traditional';

export default function useBearContext<T>(
  selector: (state: BearState) => T,
  eqaulityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(BearContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree.');
  //   return useStore(store, selector);
  return useStoreWithEqualityFn(store, selector, eqaulityFn);
}
