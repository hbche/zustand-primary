import BearsController from './BearsController';
import BearCounter from './BearsCounter';
import BearMoving from './BearsMoving';

function BearsManager() {
  return (
    <>
      <BearCounter />
      <BearMoving />
      <BearsController />
    </>
  );
}

export default BearsManager;
