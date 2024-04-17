import { atom, useAtom } from 'jotai';

const sign = window.localStorage.getItem('sign');
export const signAtom = atom(sign, (get, set, newPirce: string) => {
  if (get(signAtom) !== newPirce) {
    set(signAtom, newPirce);
    window.localStorage.setItem('sign', newPirce);
  }
});
export const useSign = () => useAtom(signAtom);
