import { create } from 'zustand';

type State = {
  firstName: string;
  lastName: string;
};

type Action = {
  updateFirstName: (firstName: State['firstName']) => void;
  updateLastName: (lastName: State['lastName']) => void;
};

const usePersonStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set({ firstName }),
  updateLastName: (lastName) => set({ lastName }),
}));

export default function InputName() {
  const firstName = usePersonStore((state) => state.firstName);
  const updateFirstName = usePersonStore((state) => state.updateFirstName);

  return (
    <div>
      <label>
        First name
        <input
          // 更新 "firstName" 状态
          onChange={(e) => updateFirstName(e.currentTarget.value)}
          value={firstName}
        />
      </label>

      <p>
        Hello, <strong>{firstName}!</strong>
      </p>
    </div>
  );
}
