import useBearsStore from './useBearsStore';

export default function BearMoving() {
  // const store = useBearsStore();
  // console.log(store);
  // 使用选择器精准选择状态，避免重复渲染
  const moving = useBearsStore((state) => state.bearsState.moving);
  console.log('bear moving re-render');

  return <div>{!moving ? 'sleeping' : 'running'}</div>;
}
