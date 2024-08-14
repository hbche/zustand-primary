import { BearsStore } from "../model";
import useBearsStore from "./useBearsStore";

export function BearCounter() {
    const bears = useBearsStore((state: BearsStore) => state.bearsState.total);
    console.log('bear counter re-render');

    return (
        <div>{bears}</div>
    );
}