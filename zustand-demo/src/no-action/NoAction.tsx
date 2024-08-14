import { create } from 'zustand';

const useBoundStore = create(() => ({
  count: 0,
}));
const increase = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }));
const decrease = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }));

function NoAction() {
  const count = useBoundStore((state) => state.count);

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
    </div>
  );
}

export default NoAction;
