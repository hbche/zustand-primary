import { useStore } from 'zustand';
import { positionStore } from './position-store';

export function MovingDot() {
  const position = useStore(positionStore, (state) => state.position);
  const setPosition = useStore(positionStore, (state) => state.setPosition);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          top: -10,
          left: -10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'red',
        }}
      ></div>
    </div>
  );
}
