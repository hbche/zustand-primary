import useBearsStore, { BearsStore } from './useBearsStore';

function BearCounter() {
  const bears = useBearsStore((state: BearsStore) => state.bearsState.total);
  console.log('bear counter re-render');

  return <div>{bears}</div>;
}

export default BearCounter;
