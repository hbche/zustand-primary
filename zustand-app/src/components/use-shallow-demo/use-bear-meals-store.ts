import { create } from 'zustand';

interface BearState {
  papaBear: string;
  mamaBear: string;
  babyBear: string;
  tinyBear?: string;
}

export const useBearMealsStore = create<BearState>(() => ({
  papaBear: 'large porridge-pot',
  mamaBear: 'middle-size porridge pot',
  babyBear: 'A little, small, wee pot',
}));
