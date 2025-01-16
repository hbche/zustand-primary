import { createJSONStorage } from 'zustand/middleware';

const storage = createJSONStorage(() => sessionStorage, {
  reviver: (key, value) => {
    if (value && value.type === 'date') {
      return new Date(value);
    }
    return value;
  },
  replace: (key, value) => {
    if (value instanceof Date) {
      return { type: 'date', value: value.toISOString() };
    }

    return value;
  },
});
