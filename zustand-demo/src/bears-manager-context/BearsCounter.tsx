import { useContext } from 'react';
import { BearsContext } from './BearsManagerContext';

export default function BearsCounter() {
  const {
    totalStore: { total },
  } = useContext(BearsContext);
  console.log('bear counter re-render');

  return <div>{total}</div>;
}
