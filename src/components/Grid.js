import React, { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { inputValueAtom } from './input.atoms';
import { generateGridAtom } from './formContainer.atoms';

const Grid = () => {
  const [generateGrid] = useAtom(generateGridAtom);
  const setGenerateGrid = useSetAtom(generateGridAtom);
  const [inputValue] = useAtom(inputValueAtom);
  console.log(inputValue, 'inputvalue');
  const createGridRows = (
    firstColumnIndex,
    randomValueForStart,
    randomValueForEnd
  ) => {
    const gridDivs = [];
    for (let i = 0; i < inputValue.rows; i++) {
      gridDivs.push(
        <div
          key={i}
          className={`h-10 w-10 bg-slate-200 border-2 border-slate-300  ${
            firstColumnIndex === 0 && randomValueForStart === i
              ? 'bg-green-600'
              : 'bg-slate-200'
          } ${
            firstColumnIndex === inputValue.columns - 1 &&
            randomValueForEnd === i
              ? 'bg-red-600'
              : ''
          } hover:bg-white`}></div>
      );
    }
    return gridDivs;
  };

  const createGridColumns = () => {
    if (generateGrid) {
      const gridColumns = [];
      const randomValueForStart = Math.floor(Math.random() * inputValue.rows);
      const randomValueForEnd = Math.floor(Math.random() * inputValue.rows);
      for (let i = 0; i < inputValue.columns; i++) {
        console.log(randomValueForStart, 'random');
        gridColumns.push(
          <div key={i} className='h-10 w-10'>
            {createGridRows(i, randomValueForStart, randomValueForEnd)}
          </div>
        );
      }
      // setGenerateGrid(false);
      return gridColumns;
    }
  };

  useEffect(() => {
    setGenerateGrid(false);
    createGridRows();
  }, [inputValue]);

  return (
    <>
      <div className='grid grid-cols-20 gap-0 justify-items-start'>
        {createGridColumns()}
      </div>
    </>
  );
};

export default Grid;
