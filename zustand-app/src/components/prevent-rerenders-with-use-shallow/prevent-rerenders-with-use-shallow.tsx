import { BearNames } from './bear-names';
import { PapaBear } from './papa-bear';

export function PreventRendersWithUseShallow() {
  return (
    <>
      <BearNames />
      <PapaBear />
    </>
  );
}
