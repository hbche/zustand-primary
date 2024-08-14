import useBearsStore from './useBearsStore';

export default function BearMoving() {
  const moving = useBearsStore((state) => state.bearsState.moving);
  console.log('bear moving re-render');

  return <div>{!moving ? 'sleeping' : 'running'}</div>;
}
