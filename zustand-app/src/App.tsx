import './App.css';
import BearCounter from './components/BearCounter';
import BearController from './components/BearController';
import BearHoney from './components/BearHoney';
import FishCounter from './components/FishCounter';
import FishController from './components/FishController';
import TicTacToe from './components/tic-tac-toe/tic-tac-toe';
import InputName from './components/InputName';
import ImmerMiddlewareDemo from './components/immer-middleware-demo/immer-middleware-demo';
import AutoGenerateSelectorDemo from './components/auto-generate-selector/auto-generate-selector';
import StoreSliceDemo from './components/store-slice-demo/store-slice-demo';
import InitializeStateWithPropsDemo from './components/initialize-state-with-props-demo/initialize-state-with-props-demo';
import { RestStateDemo } from './components/how-to-rest-state/how-to-rest-state';
import { PreventRendersWithUseShallow } from './components/prevent-rerenders-with-use-shallow/prevent-rerenders-with-use-shallow';
import { UseShallowDemo } from './components/use-shallow-demo/use-shallow-demo';
import { UseStoreDemo } from './components/use-store-demo/use-store-demo';
import { UseStoreWithEqualityFnDemo } from './components/use-store-with-equality-fn-demo/use-store-with-equality-fn-demo';

function App() {
  return (
    <>
      <BearCounter />
      <BearController />
      <BearHoney />
      <FishCounter />
      <FishController />
      <TicTacToe />
      <InputName />
      <ImmerMiddlewareDemo />
      <AutoGenerateSelectorDemo />
      <StoreSliceDemo />
      <InitializeStateWithPropsDemo />
      <RestStateDemo />
      <PreventRendersWithUseShallow />
      <UseShallowDemo />
      <UseStoreDemo />
      <UseStoreWithEqualityFnDemo />
    </>
  );
}

export default App;
