import { useFishStore } from './use-fish-store';

function PersistMiddlewateDemo() {
  const fishes = useFishStore((state) => state.fishes);
  const addFish = useFishStore((state) => state.addFish);

  return (
    <div>
      <div>Total fishes: {fishes}</div>
      <button onClick={addFish}>+</button>
    </div>
  );
}

export default PersistMiddlewateDemo;
