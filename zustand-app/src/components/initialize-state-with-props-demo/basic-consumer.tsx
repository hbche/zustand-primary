import { BearState } from './create-bear-store';
import useBearContext from './use-bear-context';

export default function BasicConsumer() {
  const bears = useBearContext<BearState['bears']>((state) => state.bears);
  const addBear = useBearContext<BearState['addBear']>(
    (state) => state.addBear
  );

  return (
    <>
      <div>{bears} Bears.</div>
      <button onClick={addBear}>Add bear</button>
    </>
  );
}
