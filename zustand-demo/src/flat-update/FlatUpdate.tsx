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
  updateUser: (newUser: User) =>
    set((state) => ({ ...state, user: newUser }), true),
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
