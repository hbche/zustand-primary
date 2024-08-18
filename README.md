# zustand-primary
深入理解 zustand

## 介绍

“状态”是描述应用程序当前行为的任何数据。这可能包括诸如“从服务器获取的对象列表”、“当前选择的项目”、“当前登录用户的名称”和“此模式是否打开？”等值。众所周知，我们在研发一个`复杂应用`的过程中，一套好的`状态管理方案`是必不可少的，既能提升研发效率，又能降低研发维护成本，那么状态管理方案那么多，它们有什么不同，我们又该如何选择适合当前应用的方案呢？

zustand 是一个小巧、快速且可扩展的基础状态管理解决方案。Zustand 具有一个基于 hooks 的舒适 API。

Zustand 是一个轻量级的 React 状态管理库，它提供了简单的 API 来创建全局状态和管理状态更新。它的设计目标是让状态管理变得更直观和高效，通常比 Redux 更简洁。 它提供了一个简单、灵活的方式来管理应用程序的状态。

[Zustand 官网](https://zustand-demo.pmnd.rs/)

### Zustand 使用初体验

- store 是一个 hooks,不需要 Provider 包裹，上手简单，使用方便
- 推荐使用 selectors,可以避免不必要的渲染，能够精准控制渲染
- 基于 immutable state model，(react-@reduxjs/toolkit、Valtio 等是基于 mutable state model)
- 支持异步操作

### Npm Downloads Trend of State Management Libraries for React

Zustand 在众多 React 状态管理库中的数据趋势

[https://npm-compare.com/@reduxjs/toolkit,jotai,mobx,recoil,valtio,zustand/#timeRange=THREE_YEARS](https://npm-compare.com/@reduxjs/toolkit,jotai,mobx,recoil,valtio,zustand/#timeRange=THREE_YEARS)

## 基础用法

### 安装 zustand

``` sh
npm install zustand
```

### 定义 Store

在 Zustand 中，我们的 store（状态）就是一个 React Hook。这个 Hook 可以在组件中使用，通过它来访问和更新应用的全局状态。与 Redux 等其他状态管理库不同，Zustand 的 store 并不是一个独立的对象或模块，而是直接通过 Hook 暴露的。例如下面示例中的 useBearsStore  就是一个 hook。

在 Zustand 中，store 可以包含任何类型的数据，包括基本类型（如数字、字符串）、对象、甚至是函数。这意味着我们可以非常灵活地定义状态，不受特定数据类型的限制。Zustand 中的 `set` 函数用于更新 store 的状态。它的行为类似于 `Object.assign` 或者 React 的 `setState`，即它会将传入的部分状态与现有状态合并，而不是替换整个状态。当然这个 set 函数也是支持替换的，只是默认行为是合并。

``` typescript
import { create } from 'zustand';
 
export interface BearState {
  moving: boolean;
  total: number;
}
 
export interface BearsStore {
  bearsState: BearState;
  increase: (step: number) => void;
  decrease: (step: number) => void;
  removeAll: () => void;
  running: () => void;
  sleeping: () => void;
}
 
const useBearsStore = create<BearsStore>((set) => ({
  bearsState: {
    total: 3,
    moving: false,
  },
  running: () =>
    set((state: BearsStore) => ({
      bearsState: { ...state.bearsState, moving: true },
    })),
  sleeping: () =>
    set((state: BearsStore) => ({
      bearsState: { ...state.bearsState, moving: false },
    })),
  increase: (newBears: number) =>
    set((state: BearsStore) => ({
      bearsState: {
        ...state.bearsState,
        total: state.bearsState.total + newBears,
      },
    })),
  decrease: (newBears: number) =>
    set((state: BearsStore) => ({
      bearsState: {
        ...state.bearsState,
        total: Math.max(state.bearsState.total - newBears, 0),
      },
    })),
  removeAll: () =>
    set((state: BearsStore) => ({
      bearsState: { ...state.bearsState, total: 0 },
    })),
}));
 
export default useBearsStore;
```


### 将 Store 与我们的组件绑定

在许多其他状态管理库（如 Redux 或 React Context）中，通常需要使用一个“provider”组件来将状态注入到应用的组件树中，然后在组件树中的任意组件中访问状态。但在 Zustand 中，我们的状态存储（store）就是一个 hook，我们可以在应用的任何地方使用它，而不需要依赖 `Provider` 组件来注入状态。

Zustand 提供了一种简单高效的方式来管理状态。当我们在组件中通过 hook 选择了某一部分状态（例如上例中的 `total`），当该状态发生变化时，组件会自动重新渲染以反映最新的状态值。这是由 Zustand 内部的订阅机制实现的，**确保组件仅在它们依赖的状态发生变化时重新渲染**，而不是整个状态树。

当我们在组件中选择状态时，组件会自动订阅这个状态的变化。一旦状态更新，相关组件会自动重新渲染，确保 UI 始终与最新的状态同步。这种机制可以让应用性能更好，因为只会重新渲染那些确实需要更新的组件。

``` tsx
import useBearsStore, { BearsStore } from './useBearsStore';
 
export function BearCounter() {
  const bears = useBearsStore((state: BearsStore) => state.bearsState.total);
  console.log('bear counter re-render');
 
  return <div>{bears}</div>;
}
```

``` tsx
import useBearsStore from './useBearsStore';
 
export default function BearMoving() {
  const moving = useBearsStore((state) => state.bearsState.moving);
  console.log('bear moving re-render');
 
  return <div>{!moving ? 'sleeping' : 'running'}</div>;
}
```

``` tsx
import useBearsStore, { BearsStore } from './useBearsStore';
 
export default function BearsController() {
  const increase = useBearsStore((state: BearsStore) => state.increase);
  const decrease = useBearsStore((state: BearsStore) => state.decrease);
  const removeAll = useBearsStore((state: BearsStore) => state.removeAll);
  const running = useBearsStore((state: BearsStore) => state.running);
  const sleeping = useBearsStore((state: BearsStore) => state.sleeping);
 
  return (
    <div>
      <button
        onClick={() => {
          increase(1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          removeAll();
        }}
      >
        Remove All
      </button>
      <button
        onClick={() => {
          decrease(1);
        }}
      >
        Decrease
      </button>
      <br />
      <button
        onClick={() => {
          sleeping();
        }}
      >
        Sleeping
      </button>
      <button
        onClick={() => {
          running();
        }}
      >
        Running
      </button>
    </div>
  );
}
```

``` tsx
import BearsController from './BearsController';
import BearCounter from './BearsCounter';
import BearMoving from './BearsMoving';
 
function BearsManager() {
  return (
    <>
      <BearCounter />
      <BearMoving />
      <BearsController />
    </>
  );
}
 
export default BearsManager;
```


## Zustand 特点

### 浅层合并

1.  当我们在使用 `set` 更新状态时，Zustand 会将新传入的状态与现有状态进行*浅层合并*。即，它只会更新我们指定的那些状态属性，而不会修改或删除其他未被提到的属性。
2.  浅层合并意味着仅第一层的属性会被合并，深层嵌套的对象或数组不会被递归合并，而是直接替换。

### 平坦更新

1.  平坦更新意味着更新操作是针对状态树的第一层级进行的，而不是嵌套的深层级属性。
2.  当我们通过 `set` 更新状态时，传入的部分状态会直接替换掉状态树中的相应部分，而不会递归地合并嵌套属性。

``` tsx
import React from 'react';
import { create } from 'zustand';
 
export type User = {
  name?: string;
  age?: number;
};
 
export type UserAction = {
  updateUser: (newUser: User) => void;
};
 
export type UserState = {
  user: User;
  updateUser: (newUser: User) => void;
};
 
const useUserStore = create<UserState>((set) => ({
  user: { name: 'Alice', age: 25 },
  updateUser: (newUser: User) => set((state) => ({ ...state, user: newUser })),
}));
 
function FlatUpdate() {
  const { user, updateUser } = useUserStore(
    ({ user, updateUser }: UserState) => ({
      user,
      updateUser,
    })
  );
 
  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <br />
      <input
        value={user.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // 只有 state 的 第一层 会做合并
          //   updateUser({ name: e.target.value });
          updateUser({ ...user, name: e.target.value });
        }}
      />
    </div>
  );
}
 
export default FlatUpdate;
```

在这个例子中，`updateUser` 函数会更新 `user` 对象中的 `name` 属性，并保持 `age` 属性不变。这是因为我们手动进行了浅层合并：`{ ...user, name: e.target.value }`。如果我们替换成  { name: e.target.value } ，则会替换掉 state 中的整个 user 部分。

### 更新嵌套结构的 state

当我们在 React 或 Zustand 中更新嵌套的状态时，需要花费一些精力来确保状态更新是**不可变**的（immutable）。这种不可变性在 React 生态系统中至关重要，因为它能够确保正确地触发组件的重新渲染和防止潜在的副作用。

类似于 React 或 Redux，通常的做法是复制状态对象的每一级。这可以通过使用展开运算符 `...` 来实现，并手动将其与新的状态值合并。像下面的示例这样：

``` tsx
import { create } from 'zustand';
 
interface User {
  name?: string;
  address?: UserAddress;
}
 
interface UserAddress {
  // 市区
  city?: string;
  // 行政编码
  zip?: string;
}
 
interface NestedUserState {
  user: User;
  updateCity: (newCity: string) => void;
}
 
const useNestedUsetStore = create<NestedUserState>((set) => ({
  user: {
    name: 'John Doe',
    address: { city: 'Tokyo', zip: '100-0001' },
  },
  updateCity: (newCity: string) =>
    set((state: NestedUserState) => ({
      user: {
        ...state.user,
        address: {
          ...state.user.address,
          city: newCity,
        },
      },
    })),
}));
 
function NestedUpdate() {
  const { user, updateCity } = useNestedUsetStore(
    (state: NestedUserState) => state
  );
 
  return (
    <div>
      <div>Name: {user.name}</div>
      <div>
        Address:
        <div>City: {user.address?.city}</div>
        <div>Zip: {user.address?.zip}</div>
      </div>
      <div>
        <input
          value={user.address?.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateCity(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
 
export default NestedUpdate;
```


### 合并策略

在 Zustand 中，`replace` 选项（或称为 "Replace flag"）允许我们直接替换整个状态，而不是使用 Zustand 默认的浅层合并策略。通常情况下，Zustand 的 `set` 函数会将传入的部分状态与现有状态进行浅层合并（shallow merge），这意味着它只更新第一层指定的字段，而不会替换整个状态对象。

当 set 函数的 `replace` 选项被设置为 `true` 时，传入的状态将完全替换当前状态，而不是进行浅层合并。这意味着现有状态的所有字段都会被新状态所覆盖。

使用场景：

1. 重置状态：当我们想要将应用状态重置为初始状态时，`replace` 选项非常有用。例如，在用户注销时，我们可能希望清除所有用户数据并恢复到初始状态。这时我们可以使用 `replace` 来覆盖当前状态。
2. 重新加载新状态：当我们从服务器加载一整块新数据并想要直接替换现有状态时，使用 `replace` 是一个好选择。这样可以确保本地状态与服务器状态完全同步，而不会保留旧的状态数据。
3. 清除不需要的状态：在一些场景中，我们可能希望清除状态中的某些字段，而不是仅仅更新某些字段。这时通过 `replace` 来完全替换旧的状态，可以确保不需要的数据被清除。

``` tsx
// 1. 重置状态
const useStore = create((set) => ({
    user: { name: 'Alice', age: 25 },
    resetUser: () => set({ user: { name: '', age: 0 } }, true),  // 使用replace完全替换状态
}));
 
// 2. 重新加载新状态
const useStore = create((set) => ({
    data: { items: [], total: 0 },
    setData: (newData) => set(newData, true),  // 使用replace替换整个数据对象
}));
 
// 3. 清除不需要的状态
const useStore = create((set) => ({
    session: { token: 'abc123', expires: '2024-12-31' },
    clearSession: () => set({}, true),  // 清除session，使用replace替换为一个空对象
}));
```

## 进阶用法

虽然 Zustand 使用灵活便捷，没有刻板的模板代码和编写风格上的要求，但是从其他状态管理库中，我们可以汲取优秀的实践。

### 实践模式

单一 Store：建议将应用的全局状态维护在一个 store 中，如果全局状态较多，可以分类切片维护。

拆分 Store：将状态拆分到多个独立的 store 中可以提高应用的模块化和可维护性。这种做法类似于 Flux 和 Redux 中的实践，将不同功能的状态分开管理，减少状态之间的耦合。

使用函数式 set 更新状态：在 Zustand 中，推荐使用函数式更新来确保状态更新的准确性。函数式更新通过接收当前状态作为参数来返回新状态，当前状态已经是此次更新前最新的状态，所以使用函数式更新可以避免状态更新中可能出现的竞态条件。

使用选择器选择组件依赖的状态：Zustand 允许使用选择器（selector）来从 store 中提取所需的状态部分。为了优化性能，推荐将选择器尽可能简化，避免不必要的重渲染。

将状态和更新动作放在一个 Store 中维护：将 store 的状态和相关操作放在一起，有助于清晰地管理和组织状态逻辑；使状态和动作的修改变得更直观和集中，减少了代码的分散性。

### 将状态和更新动作分离

将状态和更新动作分离是指在状态管理实践中，选择不使用明确的 store 动作（actions）。在这种情况下，状态更新操作直接在组件中进行，而不是通过 store 的动作方法。

优点：

1. 直接更新状态：在没有明确 store 动作的实践中，组件会直接调用状态更新函数来改变状态。这种方式简化了状态管理，但可能会导致状态逻辑分散在多个组件中。
2. 简化代码：省略 store 动作可能会使代码更简洁，因为你不需要为每个状态变更定义一个单独的动作方法。直接在组件中执行状态更新可以减少额外的抽象层。

缺点：

1. 当没有明确的 store 动作时，状态更新逻辑可能会分散在多个组件中，使得状态管理变得难以追踪和维护。
2. 随着应用的增长和状态更新逻辑的复杂化，这种做法可能会导致状态管理变得不易扩展和维护。

``` tsx
import { create } from 'zustand';
 
const useBoundStore = create(() => ({
  count: 0,
}));
const increase = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }));
const decrease = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }));
 
function NoAction() {
  const count = useBoundStore((state) => state.count);
 
  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
    </div>
  );
}
 
export default NoAction;
```

### 跨组件状态共享

Zustand 不单单适用于普通的状态管理，还适用于跨组件数据共享、数据监听操作。

数据监听需要使用 subscribeWithSelector 包裹，否则不能细粒度监听。

``` ts
const unsub1 = useDogStore.subscribe(console.log)
```

### 定义 Store

``` ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
 
const initData = {
    newDialogVisible: false,
    newFormData: null,
}
 
export const useDialogStore = create(
    subscribeWithSelector((set, get) => ({
        ...initData,
        changeNewDialog(visible, data = null) {
            set({ newDialogVisible: visible, newFormData: data })
        },
    }))
)
```

### 更新数据

``` tsx
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Form } from 'antd'
import { useDialogStore } from '@/store/dialog.js'
 
const Dialog = (props, ref) => {
    useImperativeHandle(ref, () => ({
        showModal,
    }))
    const [form] = Form.useForm()
    const { changeNewDialog } = useDialogStore()
 
    const showModal = (data) => {
        changeNewDialog(true, {})
    }
 
    return (
        <>
            <Button onClick={showModal} htmlType="submit">新建</Button>
        </>
    )
}
 
export default forwardRef(Dialog)
```

### 订阅数据

``` tsx
import { Breadcrumb } from 'antd'
import Side from './components/Side.jsx'
import List from './components/List.jsx'
import NewDialog from './components/NewDialog.jsx'
import { useEffect, useRef } from 'react'
import { useDialogStore } from '@/store/dialog.js'
import { shallow } from 'zustand/shallow'
 
const Page = () => {
    const newDialogRef = useRef()
    useEffect(() => {
        // 监听数据变化
        const unsub = useDialogStore.subscribe(
            (state) => [state.newDialogVisible, state.newFormData],
            ([visible, data]) => {
                if (visible) {
                    // console.log(visible, data)
                    newDialogRef.current.showModal(data)
                }
            },
            { equalityFn: shallow } // 浅比较
        )
        return () => {
            // 取消订阅
            unsub()
        }
    }, [])
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: '首页',
                    },
                    {
                        title: <a href="/">列表</a>,
                    },
                ]}
            />
            <div className="border-b-[1px] border-solid border-gray-300 ml-[-20px] mr-[-20px] mt-[15px]"></div>
            <div className="flex justify-between">
                <Side />
                <List />
            </div>
            <NewDialog ref={newDialogRef} />
        </>
    )
}
 
export default Page
```

### 其他用法

``` tsx
import { subscribeWithSelector } from 'zustand/middleware'
 
const useDogStore = create(
    subscribeWithSelector(() => ({ paw: true, snout: true, fur: true }))
)
 
// Listening to selected changes, in this case when "paw" changes
const unsub2 = useDogStore.subscribe((state) => state.paw, console.log)
// Subscribe also exposes the previous value
const unsub3 = useDogStore.subscribe(
    (state) => state.paw,
    (paw, previousPaw) => console.log(paw, previousPaw)
)
// Subscribe还支持一个可选的 equalityFn 函数
const unsub4 = useDogStore.subscribe(
    (state) => [state.paw, state.fur],
    console.log,
    { equalityFn: shallow }
)
// Subscribe and fire immediately
const unsub5 = useDogStore.subscribe((state) => state.paw, console.log, {
    fireImmediately: true,
})
```

## 适用场景

Zustand 是一个轻量级、可扩展的 React 状态管理库，适合以下几种场景：

1. **简单的全局状态管理**  
    Zustand 适用于那些需要管理简单全局状态的应用场景，例如用户身份、主题模式切换、语言设置等。由于其 API 简洁且易于使用，它非常适合中小型应用。
2. **组件间状态共享**  
    在一些中型应用中，不同组件之间可能需要共享某些状态，但这些状态不够复杂，没必要引入像 Redux 这样的重量级工具。Zustand 提供了一个轻便且直观的解决方案。
3. **高性能需求**  
    在需要高性能的应用中，Zustand 表现出色。它不会强制使用 React 的 Context，因此避免了不必要的重渲染，保证了状态管理的高效性。
4. **局部状态管理**  
    如果你需要在特定的组件树或模块中管理局部状态，Zustand 非常适合。它可以在不引入全局状态的情况下，方便地管理这些局部状态。
5. **跨页面状态共享**  
    当你的应用有多个页面（例如单页应用）需要共享某些状态时，Zustand 可以帮助你轻松实现这一点，而不必过于复杂化状态管理逻辑。
6. **无需依赖中间件**  
    如果你希望避免复杂的中间件配置和处理逻辑，Zustand 的 API 是完全不需要中间件的。它提供了简单的订阅和监听机制，直接操作状态，降低了代码的复杂度。
7. **快速原型开发**  
    对于需要快速迭代的项目或原型开发，Zustand 是一个不错的选择。它的学习曲线非常平滑，能够让开发者迅速上手并实现基本的状态管理需求。

总结来说，Zustand 非常适合那些状态管理需求不复杂、性能要求高、或希望保持代码简单易懂的场景。

## 关键函数源码解析

为什么一个 create 函数就能创建处一个能触发 react 精准更新的状态和 set 呢？让我们一起来解开它神秘的面纱

### create 实现

``` ts
export function useStore<TState, StateSlice>(
  api: WithReact<ReadonlyStoreApi<TState>>,
  selector: (state: TState) => StateSlice = identity as any,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean,
) {
  if (
    import.meta.env?.MODE !== 'production' &&
    equalityFn &&
    !didWarnAboutEqualityFn
  ) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    )
    didWarnAboutEqualityFn = true
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn,
  )
  useDebugValue(slice)
  return slice
}
 
// ...
// ...
 
const createImpl = <T>(createState: StateCreator<T, [], []>) => {
  if (
    import.meta.env?.MODE !== 'production' &&
    typeof createState !== 'function'
  ) {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
    )
  }
  const api =
    typeof createState === 'function' ? createStore(createState) : createState
 
  const useBoundStore: any = (selector?: any, equalityFn?: any) =>
    useStore(api, selector, equalityFn)
 
  Object.assign(useBoundStore, api)
 
  return useBoundStore
}
 
export const create = (<T>(createState: StateCreator<T, [], []> | undefined) =>
  createState ? createImpl(createState) : createImpl) as Create
 
/**
 * @deprecated Use `import { create } from 'zustand'`
 */
export default ((createState: any) => {
  if (import.meta.env?.MODE !== 'production') {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.",
    )
  }
  return create(createState)
}) as Create
```

看了上面的源码是不是还是觉得一头雾水，这不就是一层一层的嵌套调用嘛~还是没有看淡庐山真面，那么让我们一起继续往下看：

``` ts
const createStoreImpl: CreateStoreImpl = (createState) => {
  type TState = ReturnType<typeof createState>
  type Listener = (state: TState, prevState: TState) => void
  let state: TState
  const listeners: Set<Listener> = new Set()
 
  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: TState) => TState)(state)
        : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state =
        replace ?? (typeof nextState !== 'object' || nextState === null)
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state, previousState))
    }
  }
 
  const getState: StoreApi<TState>['getState'] = () => state
 
  const getInitialState: StoreApi<TState>['getInitialState'] = () =>
    initialState
 
  const subscribe: StoreApi<TState>['subscribe'] = (listener) => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }
 
  const destroy: StoreApi<TState>['destroy'] = () => {
    if (import.meta.env?.MODE !== 'production') {
      console.warn(
        '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.',
      )
    }
    listeners.clear()
  }
 
  const api = { setState, getState, getInitialState, subscribe, destroy }
  const initialState = (state = createState(setState, getState, api))
  return api as any
}
 
export const createStore = ((createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore
```

上面 createStoreImpl 只实现了一套发布订阅系统，那么如何能够触发 React 的精准更新呢？下面才是 zustand 精准更新的黑默认。

### 状态更新实现

`use-sync-external-store` 是**React 18**中引入的一个 hook，用于在组件中订阅外部状态存储（external store）并同步其状态。它为 React 提供了一种标准化的方式来确保 UI 能够可靠地响应外部状态的变化，同时避免了一些常见的性能问题，如不必要的重渲染。

#### 为什么需要`use-sync-external-store`？

在 React 18 之前，如果你需要订阅外部状态（例如，一个全局的 JavaScript 对象或浏览器的事件），通常会使用`useEffect`或者`useLayoutEffect`来实现。然而，这些方法在某些场景下可能会导致 UI 的状态与外部状态不同步，尤其是在并发渲染模式下。此外，手动处理状态的订阅和取消订阅也可能引入复杂性和潜在的性能问题。

#### 如何理解`use-sync-external-store`？

`use-sync-external-store` 提供了一个更为标准化和可靠的接口来处理这些场景，它主要有以下两个目标：

1. **确保一致性**: 确保在 React 的不同渲染模式下（包括并发模式），外部状态的变化总是能够正确地反映在 UI 中，避免在组件更新过程中出现不一致的情况。

2. **性能优化**: `use-sync-external-store`通过内部优化，减少了不必要的重渲染和订阅操作，使得状态变化的监听更加高效。

``` ts
import { useSyncExternalStore } from 'react';
 
function useStore(subscribe, getSnapshot, getServerSnapshot) {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

- **`subscribe`**: 一个函数，用于订阅外部存储的状态变化。通常在这个函数中，你会调用外部状态存储的订阅方法，并返回一个取消订阅的函数。
- **`getSnapshot`**: 一个函数，用于获取当前的状态快照（snapshot）。这个函数会在每次渲染时调用，以确保组件拿到的是最新的状态
- **`getServerSnapshot`**: 一个可选的函数，用于在服务器渲染时获取状态快照。如果没有涉及服务器端渲染，可以忽略这个参数。

#### 示例

假设我们有一个全局的`store`对象，其内部有一些状态和一个订阅机制：

``` ts
const store = {
  value: 0,
  listeners: new Set(),
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  setValue(newValue) {
    this.value = newValue;
    this.listeners.forEach(listener => listener());
  },
  getValue() {
    return this.value;
  }
};
```

我们可以使用`use-sync-external-store`来订阅这个`store`并在 React 组件中使用它：

``` tsx
import { useSyncExternalStore } from 'react';
 
function useStoreValue() {
  return useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => store.getValue()
  );
}
 
function Counter() {
  const value = useStoreValue();
   
  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => store.setValue(value + 1)}>Increment</button>
    </div>
  );
}
```

在这个例子中，`useSyncExternalStore`确保了当`store`中的值发生变化时，`Counter`组件能够及时更新，并且不会因为 React 的渲染机制产生不一致的情况。

#### 总结

`use-sync-external-store` 是 React 18 为开发者提供的一个标准化接口，用于订阅和同步外部状态。它确保了在各种渲染模式下，组件能够正确响应外部状态的变化，提升了开发体验，并优化了性能。它非常适合在需要与 React 以外的状态管理机制（如 Zustand、Redux、浏览器 API 等）集成时使用。

## 总结

| 框架          | 原理                                              | 优点                                                                                                                                                             | 缺点                                                                                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 框架          | 原理                                              | 优点                                                                                                                                                             | 缺点                                                                                                                                                                                                                                                                         |
| ---           | ---                                               | ---                                                                                                                                                              | ---                                                                                                                                                                                                                                                                          |
| hooks context | 基于 react hook，开发者可实现内/外部存储          | 1\. 使用简单 <br>2\. 不需要引用第三方库，体积最小 <br>3\. 支持存储全局状态，但在复杂应用中不推荐 <br>4\. 不依赖 react 上下文，可在组件外调用（外部存储的条件下） | 1\. context value 发生变化时，所有用到这个 context 的组件都会被重新渲染，基于 content 维护的模块越多，影响范围越大。 <br>2.依赖 Context Provider 包裹我们的应用程序，修改 store 无法在应用最顶层(App.tsx 层级)触发渲染 <br>3\. 受 ui 框架约束(react) <br>4\. 依赖 hooks 调用 |
| react-redux   | Flux 思想，发布订阅模式，遵从函数式编程，外部存储 | 1\. 不依赖 react 上下文，可在组件外调用 <br>2\. 支持存储全局状态 <br>3\. redux 本身是一种通用的状态解决方案                                                      | 1\. 心智模型需要一些时间来理解，特别是当你不熟悉函数式编程的时候 <br>2\. 依赖 Context Provider 包裹你的应用程序，修改 store 无法在应用最顶层(App.tsx 层级)触发渲染 <br>3.受 ui 框架约束(react)                                                                               |
| mobx          | 观察者模式 + 数据截止，外部存储                   | 1\. 使用简单，上手门槛低 <br>2\. 不依赖 react 上下文，可在组件外调用 <br>3\. 支持存储全局状态 <br>4.通用的状态解决方案                                           | 1.可变状态模型，某些情况下可能影响调试 <br>2\. 除了体积相对较大之外，笔者目前未感觉到较为明显的缺点，3.99M                                                                                                                                                                   |
| zustand       | Flux 思想，观察者模式，外部存储                   | 1\. 轻量，使用简单，上手门槛低 <br>2\. 不依赖 react 上下文，可在组件外调用 <br>3\. 支持存储全局状态 <br>4\. 通用的状态解决方案                                   | 1.框架本身不支持 computed 属性，但可基于 middleware 机制通过少量代码间接实现 computed ，或基于第三方库 zustand-computed 实现                                                                                                                                                 |

[https://npm-compare.com/@reduxjs/toolkit,mobx,zustand/#timeRange=THREE_YEARS](https://npm-compare.com/@reduxjs/toolkit,mobx,zustand/#timeRange=THREE_YEARS)

结合上述介绍， Zustand 和其他状态管理库的比较，可以总结出选择 Zustand 的一些主要原因：

| 特点                     | 描述                                                                                                                                                        | 比较 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 特点                     | 描述                                                                                                                                                        | 比较 |
| ---                      | ---                                                                                                                                                         | ---  |
| 轻量级                   | Zustand 是一个非常轻量级的状态管理库，相比于 Redux、MobX 等其他库，它的包体积较小，不依赖于大量的额外代码或配置。这样可以减少应用的总体大小，提高加载速度。 |      |
| **易于学习和使用**       | Zustand 提供了简单的 API，开发者无需学习复杂的概念和大量的 boilerplate 代码。直接调用 `set` 方法来更新状态，使得代码更简洁，开发速度更快。                  |      |
| **支持复杂数据结构**     | Zustand 可以与 `Map` 和 `Set` 数据结构兼容，适用于需要处理复杂键值对或唯一值集合的应用场景。                                                                |      |
| **Concurrent Mode 支持** | Zustand 设计与 React 的 Concurrent Mode 兼容，能够更好地处理异步渲染和高频率状态更新，使得用户体验更流畅。                                                  |      |
| **无额外依赖**           | Zustand 是一个独立的状态管理库，不需要依赖其他库或复杂的配置，方便与现有工具和库集成，减少了学习和维护成本。                                                |      |
| **SSR 支持**             | Zustand 可以与服务端渲染框架（如 Next.js）很好地集成，适合需要服务端状态管理的应用场景。                                                                    |      |
| **社区支持和趋势**       | Zustand 的 npm 下载趋势持续增长，说明它得到了广泛的使用和支持，这也反映了它在开发者中的受欢迎程度和稳定性。                                                 |      |

选择 Zustand 的主要原因包括其轻量级、高性能的特点，简单易用的 API，与 React Concurrent Mode 和 SSR 的兼容性，灵活的数据结构支持，独立性和没有额外依赖的优势，以及积极的社区支持和增长趋势。这些因素使得 Zustand 成为现代 React 应用中一种非常有吸引力的状态管理解决方案。

工欲善其事，必先利其器。至此 Zustand 是否成为大家未来开发的一把利剑呢？欢迎大家一起讨论和分享大家的利剑~
