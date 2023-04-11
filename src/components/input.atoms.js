import { atom } from 'jotai';

export const rowsInputValueAtom = atom('');
export const columnsInputValueAtom = atom('');

export const inputValueAtom = atom({
  rows: rowsInputValueAtom,
  columns: columnsInputValueAtom,
});
