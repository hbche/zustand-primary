import useBearStore from '../store/use-bear-store';

function BearController() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  //   const { increasePopulation } = useBearStore();

  console.log('BearController rerender');

  return <button onClick={increasePopulation}>one up</button>;
}

export default BearController;
