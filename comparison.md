---
title: 比较
description: Zustand 与其他类似库的对比情况
nav: 1
---

Zustand 是众多React状态管理库中的一种.
我们将讨论状态管理库Redux,并将其与zustand做对比.

每一个状态库都有其优势和不足,
我们将比较关键不同点和相似点.

## Redux

### 状态模型 (vs Redux)

从概念上讲，Zustand 和 Redux 非常相似，
二者都基于不可变状态模型。
然而，Redux 需要将你的应用包裹在上下文提供器中；Zustand 则不需要。

**Zustand**

``` ts
import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));
```

``` ts
import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

type Action = {
  type: keyof Actions;
  qty: number;
};

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty };
    case 'decrement':
      return { count: state.count - action.qty };
    default:
      return state;
  }
};

const useCountStore = create<State & { dispatch: (action: Action) => void }>(
  (set) => ({
    count: 0,
    dispatch: (action: Action) => {
      set((state) => countReducer(state, action));
    },
  })
);
```

**Redux**

``` ts
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)
```

```ts
import { createSlice, configureStore } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    incremented: (state, qty: number) => {
      // Redux Toolkit does not mutate the state, it uses the Immer library
      // behind scenes, allowing us to have something called "draft state".
      state.value += qty
    },
    decremented: (state, qty: number) => {
      state.value -= qty
    },
  },
})

const countStore = configureStore({ reducer: countSlice.reducer })
```

### 渲染优化 (vs Redux)

在你的应用中进行渲染优化时，
Zustand 和 Redux 在方法上并没有重大区别。
在这两个库中都建议
你通过使用选择器手动应用渲染优化。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  // ...
}
```

**Redux**

```ts
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)

const Component = () => {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  // ...
}
```

```ts
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    incremented: (state, qty: number) => {
      // Redux Toolkit does not mutate the state, it uses the Immer library
      // behind scenes, allowing us to have something called "draft state".
      state.value += qty
    },
    decremented: (state, qty: number) => {
      state.value -= qty
    },
  },
})

const countStore = configureStore({ reducer: countSlice.reducer })

const useAppSelector: TypedUseSelectorHook<typeof countStore.getState> =
  useSelector

const useAppDispatch: () => typeof countStore.dispatch = useDispatch

const Component = () => {
  const count = useAppSelector((state) => state.count.value)
  const dispatch = useAppDispatch()
  // ...
}
```