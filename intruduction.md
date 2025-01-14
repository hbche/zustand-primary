---
title: 简介
description: 如何使用 zustand
nav: 0
---

一个小型、快速且可扩展的基础状态管理解决方案。
Zustand 拥有基于钩子的舒适 API。
它既不繁琐也不带有过多的主观意见，
但又具备足够的约定，使其明确且类似 Flux。

不要因为它可爱就小看它，它可是有爪子的！
为了应对常见的陷阱，花费了大量时间，
比如令人头疼的[僵尸子进程问题]、
[React 并发性]以及在混合渲染器之间出现的[上下文丢失]。
它可能是 React 领域中唯一一个把这些都处理得很好的状态管理器。

## 安装
 
Zustand 作为 npm 包使用:

``` bash
# NPM
npm install zusnatd
```

## 首先创建一个 Store

我们的 store 是一个 hook！我们可以将任何内容放入其中：原始值、对象、函数。状态必须以不可变的方式更新，而设置（set）函数会合并状态以帮助实现这一点。

```javascript
import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

## 然后与我们的组件绑定

在任何需要用到的地方使用该 hook,无需 provider.选择我们需要的状态,当状态发生变化时对应的组件将会重新渲染.

```jsx
function BearCounter() {
  const bears = useBearStore((state) => state.bears);

  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);

  return <button onCLick={increasePopulation}>one up</button>;
}
```

### 为什么选择 Zustand 而不是 Redux？

- 简单且不强加观点
- 使钩子（hooks）成为消费状态的主要手段
- 不需要将你的应用包裹在上下文提供者（context providers）中
- 可以短暂地通知组件（不会引起渲染）

### 为什么选择 Zustand 而不是 Context？

- 代码更简洁，减少样板代码
- 仅在状态变化时渲染组件
- 提供集中化、基于动作的状态管理

