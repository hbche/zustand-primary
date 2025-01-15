import BasicConsumer from './basic-consumer';
import BearProvider from './bear-provider';

export default function InitializeStateWithPropsDemo() {
  return (
    <BearProvider bears={100}>
      <BasicConsumer />
    </BearProvider>
  );
}
