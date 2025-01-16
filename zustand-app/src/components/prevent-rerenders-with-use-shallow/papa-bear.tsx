import { useMeals } from './use-meals';

export function PapaBear() {
  console.log('PapaBear render');

  const handleEat = () => {
    useMeals.setState({ papaBear: 'a large pizza' });
  };

  return <button onClick={handleEat}>Eat a large pizza</button>;
}
