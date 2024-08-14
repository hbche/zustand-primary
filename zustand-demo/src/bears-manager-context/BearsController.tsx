import { useContext } from 'react';
import { BearsContext } from './BearsManagerContext';

export default function BearsController() {
  const {
    totalStore: { setTotal, total },
    movingStore: { setMoving },
  } = useContext(BearsContext);
  const increase = (step: number) => setTotal(total + step);
  const decrease = (step: number) => setTotal(Math.max(total - step, 0));
  const removeAll = () => setTotal(0);
  const running = () => setMoving(true);
  const sleeping = () => setMoving(false);

  return (
    <div>
      <button
        onClick={() => {
          increase(1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          removeAll();
        }}
      >
        Remove All
      </button>
      <button
        onClick={() => {
          decrease(1);
        }}
      >
        Decrease
      </button>
      <br />
      <button
        onClick={() => {
          sleeping();
        }}
      >
        Sleeping
      </button>
      <button
        onClick={() => {
          running();
        }}
      >
        Running
      </button>
    </div>
  );
}
