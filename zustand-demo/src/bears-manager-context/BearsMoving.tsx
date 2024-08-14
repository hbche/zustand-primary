import { useContext } from 'react';
import { BearsContext } from './BearsManagerContext';

export default function BearsMoving() {
  const {
    movingStore: { moving },
  } = useContext(BearsContext);
  console.log('bear moving re-render');

  return <div>{!moving ? 'sleeping' : 'running'}</div>;
}
