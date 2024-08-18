type Listener  = (value: number) => void;

const store = {
    value: 0,
    listeners: new Set<Listener>(),
    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    },
    setValue(newValue: number) {
        this.value = newValue;
        this.listeners.forEach((listener: Listener) => listener(newValue))
    },
    getValue() {
        return this.value;
    }
};

export default store;