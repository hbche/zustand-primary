import useBoundStore from './use-bound-store';

export default function StoreSliceDemo() {
  const bears = useBoundStore((state) => state.bears);
  const fishes = useBoundStore((state) => state.fishes);
  const addBear = useBoundStore((state) => state.addBear);
  const eatFish = useBoundStore((state) => state.eatFish);
  const addBoth = useBoundStore((state) => state.addBoth);
  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
      <button onClick={() => eatFish()}>Eat a fish</button>
      <button onClick={() => addBoth()}>Add Both</button>
    </div>
  );
}
