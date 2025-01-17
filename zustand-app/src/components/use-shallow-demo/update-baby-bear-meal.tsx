import { useEffect } from 'react';
import { useBearMealsStore } from './use-bear-meals-store';

const meals = [
  'A tiny, little, wee bowl',
  'A small, petite, tiny pot',
  'A wee, itty-bitty, small bowl',
  'A little, petite, tiny dish',
  'A tiny, small, wee vessel',
  'A small, little, wee cauldron',
  'A little, tiny, small cup',
  'A wee, small, little jar',
  'A tiny, wee, small pan',
  'A small, wee, little crock',
];

export function UpdateBabyBearMeal() {
  useEffect(() => {
    const timer = setInterval(() => {
      useBearMealsStore.setState({
        tinyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return null;
}
