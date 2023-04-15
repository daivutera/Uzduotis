import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { updateGridAtom, newInputValuesAtom } from './formContainer.atoms';
import { Grid as PulsarGrid, Navigator } from 'pulsar-pathfinding';

const Grid = () => {
  const [updateGrid, setUpdateGrid] = useAtom(updateGridAtom);
  const [newInputValue] = useAtom(newInputValuesAtom);
  const initialValues = { rows: 10, columns: 10 };
  const inputValueGenerated = newInputValue || initialValues;
  const [checkedCells, setCheckCells] = useState(new Set());

  const createPulsarGrid = (rows, columns) => {
    return new PulsarGrid({ width: columns, height: rows });
  };
  const findPath = (startRow, startColumn, endRow, endColumn, obstacles) => {
    const findTile = (pulsarGrid, x, y) => {
      return pulsarGrid.tiles.find(
        (tile) => tile.position.x === x && tile.position.y === y
      );
    };
    const pulsarGrid = createPulsarGrid(
      inputValueGenerated.rows,
      inputValueGenerated.columns
    );
    const begin = findTile(pulsarGrid, startColumn, startRow);
    const end = findTile(pulsarGrid, endColumn, endRow);

    console.log('pulsarGrid', pulsarGrid, 'navigator', Navigator);

    obstacles.forEach((obstacle) => {
      const row = Number(obstacle.dataset.row);
      const column = Number(obstacle.dataset.column);
      const tile = findTile(pulsarGrid, column, row);
      if (tile) {
        tile.isObstacle = !tile.isObstacle;
      }
    });

    const navigator = new Navigator(pulsarGrid, begin, end);

    // navigator.startPosition.set(startColumn, startRow);
    // navigator.endPosition.set(endColumn, endRow);

    const path = navigator.onExplore();
    console.log('Path:', path);
  };

  const onClick = (event) => {
    // const row = Number(event.target.dataset.row);
    // const column = Number(event.target.dataset.column);
    const newCheckedCells = new Set(checkedCells);
    const startDiv = document.querySelector('.bg-start');
    const endDiv = document.querySelector('.bg-end');
    const startRow = Number(startDiv.dataset.row);
    const startColumn = Number(startDiv.dataset.column);
    const endRow = Number(endDiv.dataset.row);
    const endColumn = Number(endDiv.dataset.column);
    console.log(
      'start',
      startColumn,
      'startrow',
      startRow,
      'end',
      endRow,
      'endcolumn',
      endColumn,
      'checkedCells',
      checkedCells
    );
    if (event.target.classList.contains('bg-start')) {
      return;
    } else if (event.target.classList.contains('bg-end')) {
      return;
    } else if (event.target.classList.contains('bg-white')) {
      newCheckedCells.delete(event.target);
      setCheckCells(newCheckedCells);
      console.log(checkedCells, 'checkedcells1');
      event.target.classList.remove('bg-white');
      return;
    }
    newCheckedCells.add(event.target);
    setCheckCells(newCheckedCells);
    console.log(checkedCells, 'checkedcells2');
    event.target.classList.add('bg-white');
    findPath(startRow, startColumn, endRow, endColumn, checkedCells);
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
          data-row={i}
          data-column={columnIndex}
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
