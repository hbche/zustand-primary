import { create } from 'zustand';

export const useBoundStore = create(() => ({
  foo: new Map(),
  bar: new Set(),
}));

function doSomething() {
  useBoundStore.setState((state) => ({
    foo: new Map(state.foo).set('newKey', 'newValue'),
    bar: new Set(state.bar).add('newKey'),
  }));
}
