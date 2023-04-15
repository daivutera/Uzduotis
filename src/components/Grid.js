import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { updateGridAtom, newInputValuesAtom } from './formContainer.atoms';

const Grid = () => {
  const [updateGrid, setUpdateGrid] = useAtom(updateGridAtom);
  const [newInputValue] = useAtom(newInputValuesAtom);
  const initialValues = { rows: 10, columns: 10 };
  const inputValueGenerated = newInputValue || initialValues;

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
    console.log(newInputValue, 'newinputvalue');
    const randomValueForStart = Math.floor(
      Math.random() *
        (inputValueGenerated.rows > 0
          ? inputValueGenerated.rows
          : initialValues.rows)
    );
    const randomValueForEnd = Math.floor(
      Math.random() *
        (inputValueGenerated.rows > 0
          ? inputValueGenerated.rows
          : initialValues.rows)
    );

    const gridColumns = [];

    for (let i = 0; i < inputValueGenerated.columns; i++) {
      gridColumns.push(
        <div key={i} className='h-12 w-12'>
          {createGridRows(
            i,
            randomValueForStart,
            randomValueForEnd,
            inputValueGenerated.rows,
            inputValueGenerated.columns
          )}
        </div>
      );
    }
    setUpdateGrid(false);
    console.log('updateGrid1', updateGrid);
    return gridColumns;
  };

  useEffect(() => {
    createGridColumns();
  }, [newInputValue, updateGrid]);

  const height = `${
    inputValueGenerated.rows > 0
      ? inputValueGenerated.rows * 50
      : initialValues.rows * 50
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
