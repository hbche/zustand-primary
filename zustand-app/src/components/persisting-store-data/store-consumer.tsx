import { useBearStore } from './use-bear-store';
import { useHydration } from './use-hydration';

export function StoreComsumer() {
  const hasHydrated = useHydration();
  const bears = useBearStore((state) => state.bears);
  const addABear = useBearStore((state) => state.addABear);

  if (hasHydrated) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>{bears} bears.</div>
      <button onClick={addABear}>Add a bear</button>
    </div>
  );
}
