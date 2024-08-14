import useBearsStore, { BearsStore } from './useBearsStore';

export default function BearsController() {
  const increase = useBearsStore((state: BearsStore) => state.increase);
  const decrease = useBearsStore((state: BearsStore) => state.decrease);
  const removeAll = useBearsStore((state: BearsStore) => state.removeAll);
  const running = useBearsStore((state: BearsStore) => state.running);
  const sleeping = useBearsStore((state: BearsStore) => state.sleeping);

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
