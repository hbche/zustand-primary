import { useShallow } from 'zustand/react/shallow';
import { useBearMealsStore } from './use-bear-meals-store';

export function BearNames() {
  const names = useBearMealsStore(useShallow((state) => Object.keys(state)));

  return <div>{names.join(', ')}</div>;
}
