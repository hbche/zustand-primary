import { create } from 'zustand';

const types = {
  increase: 'INCREASE',
  decrease: 'DECREASE',
} as const;

type TypeEnum = (typeof types)[keyof typeof types]; // 获取 `types` 对象值的联合类型

type State = {
  grumpiness: number;
};

type ReducerAction = {
  // 使用 keyof 和索引类型创建类型别名
  type: TypeEnum;
  by?: number;
};

const reducer = (state: State, { type, by = 1 }: ReducerAction) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by };
    case types.decrease:
      return { grumpiness: state.grumpiness - by };
    default:
      return state;
  }
};

type Action = {
  dispatch: (action: ReducerAction) => void;
};

const useGrumpyStore = create<State & Action>((set) => ({
  grumpiness: 0,
  dispatch: (action: ReducerAction) => {
    set((state) => reducer(state, action));
  },
}));

const dispatch = useGrumpyStore((state) => state.dispatch);
dispatch({ type: types.increase, by: 2 });

export default function ReduxLike() {}
