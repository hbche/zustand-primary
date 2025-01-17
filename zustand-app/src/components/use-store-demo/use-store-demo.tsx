import { CounterStoresProvider } from './counter-stores-provider';
// import { MovingDot } from './moving-dot';
// import { MovingDotWithContext } from './moving-dot-with-context';
// import { PositionStoreProvider } from './position-store-provider';
import { TabsCounter } from './tabs-counter';
import { TabsCounterWithContext } from './tabs-counter-with-context';

export function UseStoreDemo() {
  return (
    <>
      {/* <MovingDot /> */}
      <TabsCounter />
      {/* <PositionStoreProvider>
        <MovingDotWithContext />
      </PositionStoreProvider> */}
      <CounterStoresProvider>
        <TabsCounterWithContext />
      </CounterStoresProvider>
    </>
  );
}
