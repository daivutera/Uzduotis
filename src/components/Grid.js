import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { updateGridAtom, newInputValuesAtom } from './formContainer.atoms';
import { Grid as PathfindingGrid, AStarFinder } from 'pathfinding';

const Grid = () => {
  const [updateGrid, setUpdateGrid] = useAtom(updateGridAtom);
  const [newInputValue] = useAtom(newInputValuesAtom);
  const initialValues = { rows: 10, columns: 10 };
  const inputValueGenerated = newInputValue || initialValues;

  const grid = new PathfindingGrid(
    inputValueGenerated.columns,
    inputValueGenerated.rows
  );
  const onClick = (event) => {
    const startDiv = document.querySelector('.bg-start');
    const endDiv = document.querySelector('.bg-end');
    const startRow = Number(startDiv.dataset.row);
    const startColumn = Number(startDiv.dataset.column);
    const endRow = Number(endDiv.dataset.row);
    const endColumn = Number(endDiv.dataset.column);

    const finder = new AStarFinder({
      diagonalMovement: false,
    });

    if (
      event.target.classList.contains('bg-start') ||
      event.target.classList.contains('bg-end')
    ) {
      return;
    } else if (event.target.classList.contains('bg-white')) {
      event.target.classList.remove('bg-white');
      grid.setWalkableAt(
        event.target.dataset.column,
        event.target.dataset.row,
        false
      );
      return;
    }
    event.target.classList.add('bg-white');

    grid.setWalkableAt(
      event.target.dataset.column,
      event.target.dataset.row,
      true
    );

    const path = finder.findPath(
      startColumn,
      startRow,
      endColumn,
      endRow,
      grid
    );
    console.log(path, 'path');
    console.log('walkable', grid.nodes);
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
      const selectGridColor = (row, column) => {
        let colorClass = '';

        colorClass = 'bg-slate-200';
        grid.setWalkableAt(column, row, false);
        if (column === 0 && randomValueForStart === row) {
          console.log('patekau i start');
          colorClass = 'bg-start';
          grid.setWalkableAt(column, row, true);
        }
        if (column === columnsNumber - 1 && randomValueForEnd === row) {
          console.log('patekau i end');
          colorClass = 'bg-end';
          grid.setWalkableAt(column, row, true);
        }
        return colorClass;
      };
      gridDivs.push(
        <div
          key={i}
          id={`grid-row-${i}`}
          data-row={i}
          data-column={columnIndex}
          className={`h-12 w-12 border border-slate-300 ${selectGridColor(
            i,
            columnIndex
          )} hover:bg-slate-100`}
          onClick={onClick}></div>
      );
    }
    return gridDivs;
  };

  const createGridColumns = () => {
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
