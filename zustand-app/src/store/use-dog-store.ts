import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

const useDogStore = create(
  subscribeWithSelector(() => ({
    paw: true,
    snout: true,
    fur: true,
  }))
);

// 监听选择状态的变更,在当前这个示例中当 paw 变更时触发订阅函数
const ubsub2 = useDogStore.subscribe((state: any) => state.paw, console.log);

// 订阅并暴露之前的状态值
const ubsub3 = useDogStore.subscribe(
  (state: any) => state.paw,
  (paw, prePaw) => {
    console.log(paw, prePaw);
  }
);

// 定于还支持一个可选的相等性比较函数
const unsub4 = useDogStore.subscribe(
  (state) => [state.paw, state.fur],
  console.log,
  { equalityFn: shallow }
);

// 订阅并立即触发
const unsub5 = useDogStore.subscribe((state) => state.paw, console.log, {
  fireImmediately: true,
});
