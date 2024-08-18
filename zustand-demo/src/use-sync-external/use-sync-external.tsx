import useStoreValue from "./useStoreValue";
import store from "./store";

const UseSyncExternalDemo = () => {
    const value = useStoreValue();

    return (
        <div>
            <div>Value: {value}</div>
            <button onClick={() => store.setValue(value - 1)}>-</button>
            <button onClick={() => store.setValue(value + 1)}>+</button>
        </div>
    );
}

export default UseSyncExternalDemo;