import { CounterStoreProvider } from './counter-store-provider';
import { MovingDot } from './moving-dot';
import { MovingDotWithContext } from './moving-dot-with-context';
import { PositionStoreProvider } from './position-store-provider';
import { TabsCount } from './tabs-count';
import { TabsCountWithContext } from './tabs-count-with-context';

export function UseStoreWithEqualityFnDemo() {
  return (
    <>
      <MovingDot />
      <TabsCount />
      <PositionStoreProvider>
        <MovingDotWithContext color='blue' />
      </PositionStoreProvider>
      <CounterStoreProvider>
        <TabsCountWithContext />
      </CounterStoreProvider>
    </>
  );
}
