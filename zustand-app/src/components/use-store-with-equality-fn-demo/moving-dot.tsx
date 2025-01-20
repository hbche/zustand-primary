import { useStoreWithEqualityFn } from 'zustand/traditional';
import { positionStore } from '../use-store-demo/position-store';
import { shallow } from 'zustand/vanilla/shallow';

export function MovingDot() {
  const position = useStoreWithEqualityFn(
    positionStore,
    (state) => state.position,
    shallow
  );
  const setPosition = useStoreWithEqualityFn(
    positionStore,
    (state) => state.setPosition,
    shallow
  );

  return (
    <div>
      <h2>Moving dot with global store</h2>
      <div
        onPointerMove={(e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: `translate(${position.x}px, ${position.y}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20,
          }}
        />
      </div>
    </div>
  );
}
