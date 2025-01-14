import useFishStore from '../store/use-fish-store';

function FishController() {
  const deleteTuna = useFishStore((state) => state.deleteTuna);

  return <button onClick={deleteTuna}>clear tnua</button>;
}

export default FishController;
