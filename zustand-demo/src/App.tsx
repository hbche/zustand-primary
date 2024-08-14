import './App.css';
import BearsManagerContext from './bears-manager-context/BearsManagerContext';
import BearsManager from './bears-manager/BearsManager';
import FlatUpdate from './flat-update/FlatUpdate';
import NestedUpdate from './nested-update/nested-update';
import NoAction from './no-action/NoAction';

function App() {
  return (
    <>
      <BearsManager />
      <BearsManagerContext />
      <FlatUpdate />
      <NestedUpdate />
      <NoAction />
    </>
  );
}

export default App;
