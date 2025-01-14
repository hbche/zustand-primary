import { useShallow } from 'zustand/react/shallow';
import useBearStore from '../store/use-bear-store';

function BearHoney() {
  const nuts = useBearStore(
    useShallow((state) => ({
      nuts: state.nuts,
      honey: state.honey,
    }))
  );

  //   const { nuts, honey } = useBearStore((state) => ({
  //     nuts: state.nuts,
  //     honey: state.honey,
  //   }));

  console.log('BearHoney rerender');

  return (
    <div>
      Nuts {nuts.nuts}, honey {nuts.honey}
      {/* Nuts {nuts}, honey {honey} */}
    </div>
  );
}

export default BearHoney;
