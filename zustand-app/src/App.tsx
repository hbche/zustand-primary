import './App.css';
import BearCounter from './components/BearCounter';
import BearController from './components/BearController';
import BearHoney from './components/BearHoney';
import FishCounter from './components/FishCounter';
import FishController from './components/FishController';
import TicTacToe from './components/tic-tac-toe/tic-tac-toe';

function App() {
  return (
    <>
      <BearCounter />
      <BearController />
      <BearHoney />
      <FishCounter />
      <FishController />
      <TicTacToe />
    </>
  );
}

export default App;
