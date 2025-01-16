import { create } from 'zustand';

interface MealState {
  papaBear: string;
  mamaBear: string;
  littleBear: string;
}

export const useMeals = create<MealState>(() => ({
  papaBear: 'large porridge-pot',
  mamaBear: 'middle-size porridge pot',
  littleBear: 'A little, small, wee pot',
}));
