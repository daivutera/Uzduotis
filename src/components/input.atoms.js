import { atom } from 'jotai';

// export const rowsInputValueAtom = atom('');
// export const columnsInputValueAtom = atom('');

export const inputValueAtom = atom({
  rows: 10,
  columns: 10,
});
