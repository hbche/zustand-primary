import { useRef } from 'react';
import { BearProps, BearStore, createBearStore } from './create-bear-store';
import { BearContext } from './bear-context';

type BearProviderProps = React.PropsWithChildren<BearProps>;

export default function BearProvider({
  children,
  ...props
}: BearProviderProps) {
  const storeRef = useRef<BearStore>();
  if (!storeRef.current) {
    storeRef.current = createBearStore(props);
  }

  return (
    <BearContext.Provider value={storeRef.current}>
      {children}
    </BearContext.Provider>
  );
}
