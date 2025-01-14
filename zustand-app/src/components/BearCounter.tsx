import useBearStore from '../store/use-bear-store';

function BearCounter() {
  const bears = useBearStore((state) => state.bears);

  console.log('BearCounter rerender');

  return <h1>{bears} around here ...</h1>;
}

export default BearCounter;
