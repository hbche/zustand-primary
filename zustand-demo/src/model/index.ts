
export interface BearState {
    moving: boolean;
    total: number;
}

export interface BearsStore {
    bearsState: BearState;
    increase: (step: number) => void;
    decrease: (step: number) => void;
    removeAll: () => void;
    running: () => void;
    sleeping: () => void;
}