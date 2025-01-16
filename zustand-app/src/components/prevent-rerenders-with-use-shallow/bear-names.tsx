import { useShallow } from 'zustand/react/shallow';
import { useMeals } from './use-meals';

export function BearNames() {
  console.log('BearNames render');

  const names = useMeals(useShallow((state) => Object.keys(state)));

  return <div>{names.join(', ')}</div>;
}
