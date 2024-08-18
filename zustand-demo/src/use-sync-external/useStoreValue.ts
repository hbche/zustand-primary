import { useSyncExternalStore } from "react";
import store from "./store";

const useStoreValue = () => useSyncExternalStore(
    onChange => {
        console.log(onChange);
        return store.subscribe(onChange);
    },
    () => store.getValue()
);

export default useStoreValue;