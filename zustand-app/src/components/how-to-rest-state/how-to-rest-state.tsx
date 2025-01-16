import { resetAllSlices } from './create-with-reset';
import { useBoundStore } from './use-slice';

export function RestStateDemo() {
  const salmon = useBoundStore((state) => state.salmon);
  const addSalmon = useBoundStore((state) => state.addSalmon);
  const tuna = useBoundStore((state) => state.tuna);
  const addTuna = useBoundStore((state) => state.addTuna);

  return (
    <div>
      <div>{salmon} salmons</div>
      <div>
        <button onClick={() => addSalmon(1)}>Add a salmon</button>
      </div>
      <div>{tuna} tunas</div>
      <div>
        <button onClick={() => addTuna(1)}>Add a tuna</button>
      </div>
      <div>
        <button onClick={resetAllSlices}>Reset</button>
      </div>
    </div>
  );
}
