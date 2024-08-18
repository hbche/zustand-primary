import './App.css';
import BearsManagerContext from './bears-manager-context/BearsManagerContext';
import BearsManager from './bears-manager/BearsManager';
import FlatUpdate from './flat-update/FlatUpdate';
import NestedUpdate from './nested-update/nested-update';
import NoAction from './no-action/NoAction';
import UseSyncExternalDemo from './use-sync-external/use-sync-external';

function App() {
  return (
    <>
      <BearsManager />
      <BearsManagerContext />
      <FlatUpdate />
      <NestedUpdate />
      <NoAction />
      <UseSyncExternalDemo />
    </>
  );
}

export default App;
