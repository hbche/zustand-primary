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
  address: string;
  updateUser: (newUser: User) => void;
  updateAddress: (newAddress: string) => void;
};

const useUserStore = create<UserState>((set) => ({
  user: { name: 'Alice', age: 25 },
  address: 'Wuhan',
  updateUser: (newUser: User) =>
    // 浅层合并，会采用newUser的值覆盖原有user的所有值
    // set((state) => ({ ...state, user: newUser }), true),
    set((state) => ({ ...state, user: { ...state.user, ...newUser } }), true),
  updateAddress: (address: string) =>
    set((state) => ({ ...state, address }), true)

}));

function FlatUpdate() {
  const { user, updateUser, address, updateAddress } = useUserStore(
    ({ user, updateUser, address, updateAddress }: UserState) => ({
      user,
      updateUser,
      address,
      updateAddress
    })
  );

  return (
    <section>
      <header>浅层合并</header>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <br />
      <input
        value={user.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          updateUser({ name: e.target.value });
        }}
      />
      <br />
      <div>{address}</div>
      <input value={address} onChange={(e) => updateAddress(e.target.value)} />
    </section>
  );
}

export default FlatUpdate;
