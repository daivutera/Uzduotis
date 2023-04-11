import React, { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { inputValueAtom } from './input.atoms';
import { generateGridAtom } from './formContainer.atoms';

const Grid = () => {
  const [generateGrid] = useAtom(generateGridAtom);
  const setGenerateGrid = useSetAtom(generateGridAtom);
  const [inputValue] = useAtom(inputValueAtom);
  const [selectedManually, setSelectedManually] = useState(false);
  console.log(inputValue, 'inputvalue');

  const onClick = (event) => {
    if (event.target.classList.contains('bg-green-600')) {
      return;
    }
    event.target.classList.add('bg-white');
  };

  const createGridRows = (
    columnIndex,
    randomValueForStart,
    randomValueForEnd
  ) => {
    const gridDivs = [];

    console.log('inputrows', inputValue.rows);
    for (let i = 0; i < inputValue.rows; i++) {
      const selectGridColor = () => {
        let colorClass = '';
        if (selectedManually) {
          console.log('manualy start');
        } else if (columnIndex === 0 && randomValueForStart === i) {
          colorClass = 'bg-green-600';
          console.log('patekau i zalia', i, inputValue.rows);
        } else if (
          columnIndex === inputValue.columns - 1 &&
          randomValueForEnd === i
        ) {
          colorClass = 'bg-red-500';
        } else {
          colorClass = 'bg-slate-200';
          console.log('patekau i pilka', i, inputValue.rows);
        }
        return colorClass;
      };
      gridDivs.push(
        <div
          key={i}
          id={`grid-row-${i}`}
          className={`h-12 w-12  border-2 border-slate-300 ${selectGridColor()} hover:bg-slate-100`}
          onClick={onClick}></div>
      );
    }
    return gridDivs;
  };

  const createGridColumns = () => {
    const randomValueForStart = Math.floor(Math.random() * inputValue.rows);
    const randomValueForEnd = Math.floor(Math.random() * inputValue.rows);
    if (generateGrid) {
      const gridColumns = [];

      for (let i = 0; i < inputValue.columns; i++) {
        console.log(randomValueForStart, 'random');
        gridColumns.push(
          <div key={i} className='h-12 w-12'>
            {createGridRows(i, randomValueForStart, randomValueForEnd)}
          </div>
        );
      }
      return gridColumns;
    }
    // const gridColumns = [];
    // const initialValue = 10;
    // for (let i = 0; i < initialValue; i++) {
    //   console.log(randomValueForStart, 'random');
    //   gridColumns.push(
    //     <div key={i} className='h-12 w-12'>
    //       {createGridRows(i, randomValueForStart, randomValueForEnd)}
    //     </div>
    //   );
    // }
    // console.log('patekau i ne');
    // return gridColumns;
  };

  useEffect(() => {
    setGenerateGrid(false);
    createGridRows();
  }, [inputValue]);

  return (
    <>
      <div className='grid grid-cols-20'>{createGridColumns()}</div>
    </>
  );
};

export default Grid;
