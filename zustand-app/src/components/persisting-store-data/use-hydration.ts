import { useEffect, useState } from 'react';
import { useBearStore } from './use-bear-store';

export function useHydration() {
  const [hydrated, setHydrated] = useState<boolean>();

  useEffect(() => {
    const unsubHydrate = useBearStore.persist.onHydrate(() => {
      setHydrated(false);
    });

    const unsubFinishHydration = useBearStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(useBearStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
}
