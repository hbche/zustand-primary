# Zustand

## Zustand 基础

### 首先创建一个 Store

我们的 store 是一个 hook！我们可以将任何内容放入其中：原始值、对象、函数。状态必须以不可变的方式更新，而设置（set）函数会合并状态以帮助实现这一点。

```javascript
import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

### 然后与我们的组件绑定

在任何需要用到的地方使用该 hook,无需 provider.选择我们需要的状态,当状态发生变化时对应的组件将会重新渲染.

```javascript
function BearCounter() {
  const bears = useBearStore((state) => state.bears);

  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);

  return <button onCLick={increasePopulation}>one up</button>;
}
```

#### 为什么选择 Zustand 而不是 Redux？

- 简单且不强加观点
- 使钩子（hooks）成为消费状态的主要手段
- 不需要将你的应用包裹在上下文提供者（context providers）中
- 可以短暂地通知组件（不会引起渲染）

#### 为什么选择 Zustand 而不是 Context？

- 代码更简洁，减少样板代码
- 仅在状态变化时渲染组件
- 提供集中化、基于动作的状态管理

## 手册

### 获取所有状态

我们可以这样一次性拿到 store 中的全部状态，但请注意，这将导致组件在每次状态变化时都会更新！

```javascript
const bearState = useBearStore();
```

### 选取多状态组成的状态切片

默认采用严格相等(old === new)进行变更检测，这对于原子状态选择来说是高效的。

```javascript
const nuts = useBearStore((state) => state.nuts);
const honey = useBearStore((state) => state.honey);
```

如果你想构建一个包含多个状态选择的单一对象，类似于 Redux 的 mapStateToProps，你可以使用 useShallow 来防止当选择器根据浅相等性比较发现没有变化时的不必要的重新渲染。

```javascript
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const useBearStore = create((set) => ({
  nuts: 0,
  honey: 0,
  treats: {},
  // ...
}));

// Object pick, re-renders the component when either state.nuts or state.honey change
const { nuts, honey } = useBearStore(
  useShallow((state) => ({ nuts: state.nuts, honey: state.honey }))
);

// Array pick, re-renders the component when either state.nuts or state.honey change
const [nuts, honey] = useBearStore(
  useShallow((state) => [state.nuts, state.honey])
);

// Mapped picks, re-renders the component when state.treats changes in order, count or keys
const treats = useBearStore(useShallow((state) => Object.keys(state.treats)));
```

为了更精确地控制重新渲染，你可以提供任何自定义的相等性函数（这个示例需要使用 createWithEqualityFn）。

```javascript
const treats = useBearStore(
  (state) => state.treats,
  (oldTreats, newTreats) => compare(oldTreats, newTreats)
);
```

### 覆盖状态

`set` 函数有一个第二个参数，默认为 `false`。如果设置为 `true`，它将替换整个状态模型，而不是合并。请注意不要覆盖你依赖的部分，比如动作（actions），更新状态的函数。

```javascript
import omit from 'lodash-es/omit';

const useFishStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  // 清空store中的所有数据,包括action
  deleteEverything: () => set({}, true),
  deleteTuna: () => set((state) => omit(state, ['tuna']), true),
}));
```

### 异步动作

当你准备好的时候只需调用 `set`，Zustand 不在乎你的动作是否是异步的。

```javascript
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond);
    set({ fishies: await response.json() });
  },
}));
```

### 在 action 中获取状态

`set` 允许使用函数更新 `set(state => result)`，但我们仍然可以通过 `get` 在其外部访问状态。

```javascript
const useSoundStore = create((set, get) => ({
    sound: 'grunt',
    action: () => {
        const sound = get().sound;
        ...
    }
}))
```

### 在组件外部读取/写入状态并响应变化

有时你需要以非响应式的方式访问状态，或者对状态管理器（store）进行操作。在这些情况下，生成的钩子（hook）在其原型上附加了一些实用函数。

```javascript
const useDogStore = create((state) => ({
  paw: true,
  snout: true,
  fur: true,
}));

// 获取无响应的最新状态
const paw = useDogStore.getState().paw;
// 监听所有变化，每次变化时同步触发
const unsub1 = useDogStore.sunscrube(console.log);
// 更新状态,将触发监听函数的执行
useDogStore.setState({ paw: false });
// 退订监听函数
unsub1();

function Component() {
    const paw = useDogStore(stat => state.paw);
    ...
}
```

#### 使用选择器订阅

如果你需要使用选择器进行订阅，`subscribeWithSelector` 中间件会提供帮助。

通过这个中间件，`subscribe` 接受一个额外的签名：

```javascript
subscribe(selector, callback, options?: { equalityFn, fireImmediately }): Unsubscribe
```

```javascript
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
```

### 在 React 之外使用 zustand

`Zustand` 核心可以被导入和使用，而无需依赖 `React`。唯一的区别是 `create` 函数不会返回一个钩子，而是 API 实用工具。

```javascript
import {createStore} from 'zustand';

const store = createStore(set => ...);
const {getState, setState, subscribe, getInitialState} = store;

export default store;
```

你可以使用原生的 `store`，并从 `v4` 版本开始使用 `useStore` 钩子。

```javascript
import { useStore } from 'zustand';
import { vanillaStore } from './vanillaStore';

const useBoundStore = (selector) => useStore(vanillaStore, selector);
```

### 瞬态更新（用于频繁发生的状态变化）

订阅函数允许组件绑定到状态的一部分，而不会在状态变化时强制重新渲染。最好将其与 `useEffect` 结合使用，以便在组件卸载时自动取消订阅。当你被允许直接修改视图时，这可能会对性能产生显著的影响。

``` javascript
const useScratchStore = create((set) => ({ scratches: 0, ... }))

const Component = () => {
  // Fetch initial state
  const scratchRef = useRef(useScratchStore.getState().scratches)
  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => useScratchStore.subscribe(
    state => (scratchRef.current = state.scratches)
  ), [])
  ...
```

### 厌倦了 reducer 和更改嵌套状态了吗？使用 Immer 吧！
