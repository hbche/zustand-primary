import BearsController from './BearsController';
import BearCounter from './BearsCounter';
import BearMoving from './BearsMoving';

function BearsManager() {
  return (
    <section>
      <header>Zustand 实现状态共享</header>
      <BearCounter />
      <BearMoving />
      <BearsController />
    </section>
  );
}

export default BearsManager;
