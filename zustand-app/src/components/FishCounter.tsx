import useFishStore from '../store/use-fish-store';

function FishCounter() {
  const tuna = useFishStore((state) => state.tuna);

  return <div>tuna: {tuna}</div>;
}

export default FishCounter;
