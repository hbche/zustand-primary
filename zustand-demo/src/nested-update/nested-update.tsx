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
