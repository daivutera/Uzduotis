import React, { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { inputValueAtom } from './input.atoms';
import {
  generateGridAtom,
  generateInitialGridAtom,
} from './formContainer.atoms';

const Grid = () => {
  const [generateGrid] = useAtom(generateGridAtom);
  const [generateInitialGrid] = useAtom(generateInitialGridAtom);
  const setGenerateGrid = useSetAtom(generateGridAtom);
  const [inputValue] = useAtom(inputValueAtom);
  const initialValues = { rows: 10, columns: 10 };

  const onClick = (event) => {
    if (event.target.classList.contains('bg-start')) {
      return;
    } else if (event.target.classList.contains('bg-end')) {
      return;
    } else if (event.target.classList.contains('bg-white')) {
      event.target.classList.remove('bg-white');
      return;
    }
    event.target.classList.add('bg-white');
  };

  const createGridRows = (
    columnIndex,
    randomValueForStart,
    randomValueForEnd,
    rowsNumber,
    columnsNumber
  ) => {
    const gridDivs = [];

    for (let i = 0; i < rowsNumber; i++) {
      const selectGridColor = () => {
        let colorClass = '';
        if (columnIndex === 0 && randomValueForStart === i) {
          colorClass = 'bg-start';
        } else if (
          columnIndex === columnsNumber - 1 &&
          randomValueForEnd === i
        ) {
          colorClass = 'bg-end';
        } else {
          colorClass = 'bg-slate-200';
        }
        return colorClass;
      };
      gridDivs.push(
        <div
          key={i}
          id={`grid-row-${i}`}
          className={`h-12 w-12 border border-slate-300 ${selectGridColor()} hover:bg-slate-100`}
          onClick={onClick}></div>
      );
    }
    return gridDivs;
  };

  const createGridColumns = () => {
    const randomValueForStart = Math.floor(
      Math.random() *
        (inputValue.rows > 0 ? inputValue.rows : initialValues.rows)
    );
    const randomValueForEnd = Math.floor(
      Math.random() *
        (inputValue.rows > 0 ? inputValue.rows : initialValues.rows)
    );
    if (generateGrid) {
      const gridColumns = [];

      for (let i = 0; i < inputValue.columns; i++) {
        gridColumns.push(
          <div key={i} className='h-12 w-12'>
            {createGridRows(
              i,
              randomValueForStart,
              randomValueForEnd,
              inputValue.rows,
              inputValue.columns
            )}
          </div>
        );
      }
      return gridColumns;
    } else if (!generateGrid && inputValue && generateInitialGrid) {
      const gridColumns = [];
      for (let i = 0; i < initialValues.columns; i++) {
        gridColumns.push(
          <div key={i} className='h-12 w-12'>
            {createGridRows(
              i,
              randomValueForStart,
              randomValueForEnd,
              initialValues.rows,
              initialValues.columns
            )}
          </div>
        );
      }
      return gridColumns;
    }
  };

  useEffect(() => {
    setGenerateGrid(false);
    createGridRows();
  }, [inputValue]);

  const height = `${
    inputValue.rows > 0 ? inputValue.rows * 50 : initialValues.rows * 50
  }`;

  return (
    <div className={`h-full w-full`}>
      <div
        className={`grid w-full grid-cols-custom2`}
        style={{ height: `${height}px` }}>
        {createGridColumns()}
      </div>
    </div>
  );
};

export default Grid;
