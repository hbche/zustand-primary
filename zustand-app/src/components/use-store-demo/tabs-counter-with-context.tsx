import { useState } from 'react';
import { useCounterStore } from './use-counter-store';

export function TabsCounterWithContext() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const counterState = useCounterStore(
    `tab-${currentTabIndex}`,
    (state) => state
  );

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <h3>Using dynamic scoped (non-global) vanilla stores in React</h3>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid salmon',
          paddingBottom: 4,
        }}
      >
        <button
          type='button'
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(0)}
        >
          Tab 1
        </button>
        <button
          type='button'
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(1)}
        >
          Tab 2
        </button>
        <button
          type='button'
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(2)}
        >
          Tab 3
        </button>
      </div>
      <div style={{ padding: 4 }}>
        Content of Tab {currentTabIndex + 1}
        <br /> <br />
        <button type='button' onClick={() => counterState.increment()}>
          Count: {counterState.count}
        </button>
      </div>
    </div>
  );
}
