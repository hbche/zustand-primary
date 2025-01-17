import { usePositionStore } from './use-position-store';

export function MovingDotWithContext() {
  const position = usePositionStore((state) => state.position);
  const setPosition = usePositionStore((state) => state.setPosition);

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
          backgroundColor: 'blue',
        }}
      ></div>
    </div>
  );
}
